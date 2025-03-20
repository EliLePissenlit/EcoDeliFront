import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { COLORS } from '../constants/colors';

export const Home = () => {
  return (
    <Container>
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          sx={{
            color: COLORS.PRIMARY_GREEN,
            fontFamily: 'Futura Display',
            mb: 4,
          }}
        >
          Bienvenue sur EcoDeli
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: COLORS.NIGHT_BLUE,
            textAlign: 'center',
            maxWidth: 800,
            mb: 4,
          }}
        >
          Votre service de livraison éco-responsable de proximité
        </Typography>
      </Box>
    </Container>
  );
}; 