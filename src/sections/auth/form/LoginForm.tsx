import React from 'react';
import { Box, TextField, Link, Typography, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { Button } from '../../../components/Button/Button';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    gapi: any;
  }
}

const API_URL = import.meta.env.VITE_API_URL;

const LoginForm = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    console.log('API_URL:', API_URL);
    console.log('Données envoyées:', { email, password });

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Réponse brute:', response);

      if (!response.ok) {
        const data = await response.json();
        console.log('Erreur backend:', data);
        setError(data.message || 'Erreur lors de la connexion');
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log('Réponse OK backend:', data);
      if (data.data && data.data.token) {
        localStorage.setItem('token', data.data.token);
      }
      setLoading(false);
      navigate('/');
    } catch (err) {
      console.error('Erreur réseau JS:', err);
      setError('Erreur réseau');
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Tentative de connexion Google...');
    if (window.gapi) {
      window.gapi.auth2.getAuthInstance().signIn().then(
        async (googleUser: any) => {
          const id_token = googleUser.getAuthResponse().id_token;
          console.log('id_token Google:', id_token);
          try {
            const response = await fetch(`${API_URL}/api/auth/google`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id_token }),
            });

            console.log('Réponse Google backend:', response);

            if (!response.ok) {
              const data = await response.json();
              console.log('Erreur backend Google:', data);
              setError(data.message || 'Erreur lors de la connexion Google');
              return;
            }

            const data = await response.json();
            console.log('Réponse OK backend Google:', data);
            if (data.data && data.data.token) {
              localStorage.setItem('token', data.data.token);
            }
            navigate('/');
          } catch (err) {
            console.error('Erreur réseau Google JS:', err);
            setError('Erreur réseau lors de la connexion Google');
          }
        },
        (error: any) => {
          console.error('Erreur de connexion Google:', error);
        }
      );
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
        id="email"
        label={t('email')}
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label={t('password')}
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Box sx={{ mt: 2, mb: 2 }}>
        <Link href="#" variant="body2" sx={{ color: 'primary.main' }}>
          {t('forgotPassword')}
        </Link>
      </Box>
      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Button
        text={t('login')}
        type="submit"
        fullWidth
        disabled={loading}
      />
    </Box>
  );
};

export default LoginForm; 