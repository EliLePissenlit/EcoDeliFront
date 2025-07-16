import React from 'react';
import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';

import StyledGradientBackground from './styled-gradient-background';

export default function StyledPage({
  children,
  title,
  showGradientBackground = false,
}: {
  children: React.ReactNode;
  title: string;
  showGradientBackground?: boolean;
}): JSX.Element {
  return (
    <>
      <Helmet>
        <title>{`Ecodeli | ${title}`}</title>
      </Helmet>
      {showGradientBackground && <StyledGradientBackground />}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </Box>
    </>
  );
}
