import React, { useState, useRef, useEffect } from "react";
import { Box, TextField, Typography, Divider, Autocomplete } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { Button } from '../../../components/Button/Button';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import AddressAutocomplete from "../../../components/AddressAutocomplete";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const API_URL = import.meta.env.VITE_API_URL;
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const RegisterForm = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [placeId, setPlaceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setPhoneError('');
    setAddressError('');

    let hasError = false;

    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      setEmailError(t('emailInvalid'));
      hasError = true;
    }
    if (password.length < 6) {
      setPasswordError(t('passwordTooShort'));
      hasError = true;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError(t('passwordsDontMatch'));
      hasError = true;
    }
    if (!/^\d{10}$/.test(phone)) {
      setPhoneError(t('phoneInvalid'));
      hasError = true;
    }
    if (!address) {
      setAddressError(t('addressRequired'));
      hasError = true;
    }
    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      const recaptchaToken = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
        action: 'register'
      });

      const body = {
        email,
        password,
        firstName,
        lastName,
        phone,
        placeId,
        recaptchaToken
      };
      console.log('Register body:', body);

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.error && data.error.errors) {
          data.error.errors.forEach(err => {
            if (err.path === 'email') setEmailError(t('emailInvalid'));
            if (err.path === 'password') setPasswordError(t('passwordInvalid'));
            if (err.path === 'phone') setPhoneError(t('phoneInvalid'));
          });
        } else {
          setError(data.message || t('registerError'));
        }
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log('Réponse OK backend register:', data);
      if (data.data && data.data.token) {
        localStorage.setItem('token', data.data.token);
      }
      setSuccess(true);
      setLoading(false);
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError('Erreur réseau');
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // TODO: Implémenter l'authentification Google
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Button
        text={t('continueWithGoogle')}
        icon={<GoogleIcon />}
        onClick={handleGoogleSignIn}
        fullWidth
        sx={{ mb: 3 }}
      />
      
      <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
        <Divider sx={{ flex: 1 }} />
        <Typography variant="body2" sx={{ mx: 2, color: 'text.secondary' }}>
          {t('or')}
        </Typography>
        <Divider sx={{ flex: 1 }} />
      </Box>

      <TextField
        margin="normal"
        required
        fullWidth
        id="firstName"
        label={t('firstName')}
        name="firstName"
        autoComplete="given-name"
        autoFocus
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="lastName"
        label={t('lastName')}
        name="lastName"
        autoComplete="family-name"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label={t('email')}
        name="email"
        autoComplete="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        error={!!emailError}
        helperText={emailError}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="phone"
        label={t('phone')}
        autoComplete="tel"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        error={!!phoneError}
        helperText={phoneError}
      />
      <AddressAutocomplete
        onSelect={place => {
          setAddress(place.formatted_address || '');
          setPlaceId(place.place_id || '');
          console.log('Adresse choisie:', place.formatted_address, 'Place ID:', place.place_id);
        }}
      />
      {addressError && (
        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
          {addressError}
        </Typography>
      )}
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label={t('password')}
        type="password"
        id="password"
        autoComplete="new-password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        error={!!passwordError}
        helperText={passwordError}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label={t('confirmPassword')}
        type="password"
        id="confirmPassword"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        error={!!confirmPasswordError}
        helperText={confirmPasswordError}
      />
      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="success.main" variant="body2" sx={{ mb: 2 }}>
          Inscription réussie !
        </Typography>
      )}
      <Button
        text={t('register')}
        type="submit"
        fullWidth
        disabled={loading}
      />
    </Box>
  );
};

export default RegisterForm; 