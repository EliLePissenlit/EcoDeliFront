import React from 'react';
import { m } from 'framer-motion';

import { useTheme } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';

type Props = {
  title: string;
  gradientType?: 'gradient' | 'gradientMini';
};

export default function StyledSectionTitle({
  title,
  gradientType = 'gradient',
}: Props): JSX.Element {
  const theme = useTheme();

  const animationConfig = {
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: 'spring', stiffness: 70, damping: 10 },
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      textAlign={{ xs: 'center', sm: 'center', md: 'center', lg: 'left' }}
      spacing={1}
      direction="row"
      sx={{
        marginBottom: 2,
      }}
    >
      <m.div
        initial={animationConfig.initial}
        animate={animationConfig.animate}
        transition={animationConfig.transition}
      >
        <Typography variant={gradientType} color={theme.palette.text.primary}>
          {title}
        </Typography>
      </m.div>
    </Stack>
  );
}
