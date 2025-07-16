import React from 'react';
import { m } from 'framer-motion';

import { Stack, Typography } from '@mui/material';

type Props = {
  subtitle: string;
};

export default function StyledSectionSubtitle({ subtitle }: Props): JSX.Element {
  const animationConfig = {
    initial: { y: -30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: 'spring', stiffness: 70, damping: 10 },
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      spacing={1}
      sx={{
        marginBottom: 4,
      }}
    >
      <m.div
        initial={animationConfig.initial}
        animate={animationConfig.animate}
        transition={animationConfig.transition}
      >
        <Typography variant="body1" color="text.secondary">
          {subtitle}
        </Typography>
      </m.div>
    </Stack>
  );
}
