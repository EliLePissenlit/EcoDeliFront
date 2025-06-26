import React from 'react';
import { Box, TextField, Link, Typography, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { Button } from '../../../components/Button/Button';
import GoogleIcon from '@mui/icons-material/Google';

declare global {
  interface Window {
    gapi: any;
  }
}

const LoginForm = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Implémenter la logique de connexion
  };

  const handleGoogleSignIn = () => {
    if (window.gapi) {
      window.gapi.auth2.getAuthInstance().signIn().then(
        (googleUser: any) => {
          const profile = googleUser.getBasicProfile();
          console.log('ID: ' + profile.getId());
          console.log('Name: ' + profile.getName());
          console.log('Email: ' + profile.getEmail());
          // TODO: Envoyer ces informations au backend
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
      />
      <Box sx={{ mt: 2, mb: 2 }}>
        <Link href="#" variant="body2" sx={{ color: 'primary.main' }}>
          {t('forgotPassword')}
        </Link>
      </Box>
      <Button
        text={t('login')}
        type="submit"
        fullWidth
      />
    </Box>
  );
};

export default LoginForm; 