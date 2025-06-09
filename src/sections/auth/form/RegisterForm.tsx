import React, { useState } from 'react';
import { Box, TextField, Typography, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { Button } from '../../../components/Button/Button';
import GoogleIcon from '@mui/icons-material/Google';
import { Autocomplete } from '@react-google-maps/api';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const RegisterForm = () => {
  const { t } = useTranslation();
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [placeId, setPlaceId] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const token = await window.grecaptcha.execute('6LftpVorAAAAAGhacTr0zW2TNdHt1TacMk5Trqrm', {
        action: 'register'
      });

      const formData = {
        email: (event.target as HTMLFormElement).email.value,
        password: (event.target as HTMLFormElement).password.value,
        firstName: (event.target as HTMLFormElement).firstName.value,
        lastName: (event.target as HTMLFormElement).lastName.value,
        phone: (event.target as HTMLFormElement).phone.value,
        placeId: placeId,
        recaptchaToken: token
      };

      // TODO: Appel API pour l'inscription
      console.log('Form data:', formData);
    } catch (error) {
      console.error('Erreur reCAPTCHA:', error);
      alert('Une erreur est survenue lors de la vérification de sécurité');
    }
  };

  const handleGoogleSignIn = () => {
    // TODO: Implémenter l'authentification Google
  };

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.place_id) {
        setPlaceId(place.place_id);
      }
    }
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
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="lastName"
        label={t('lastName')}
        name="lastName"
        autoComplete="family-name"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label={t('email')}
        name="email"
        autoComplete="email"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="phone"
        label={t('phone')}
        name="phone"
        autoComplete="tel"
      />
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="address"
          label={t('address')}
          name="address"
          autoComplete="street-address"
        />
      </Autocomplete>
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label={t('password')}
        type="password"
        id="password"
        autoComplete="new-password"
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
      />
      
      <Button
        text={t('register')}
        type="submit"
        fullWidth
      />
    </Box>
  );
};

export default RegisterForm; 