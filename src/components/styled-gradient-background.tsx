import { m } from 'framer-motion';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';

export default function StyledGradientBackground() {
  const theme = useTheme();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setPosition({ x, y });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <Box
      component={m.div}
      style={{
        background: `radial-gradient(circle at ${position.x}% ${position.y}%, 
          ${alpha(theme.palette.primary.main, 0.08)} 0%, 
          ${alpha(theme.palette.primary.main, 0.05)} 15%, 
          ${alpha(theme.palette.primary.main, 0.02)} 25%, 
          ${theme.palette.background.default} 35%)`,
      }}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: theme.palette.background.default,
        zIndex: -1,
        transition: 'background 0.2s ease-out',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at ${position.x}% ${position.y}%, 
            ${alpha(theme.palette.primary.main, 0.04)} 0%, 
            transparent 25%)`,
          pointerEvents: 'none',
          transition: 'background 0.2s ease-out',
        },
      }}
    />
  );
}
