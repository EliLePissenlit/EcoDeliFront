import { m } from 'framer-motion';
import { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

import { varFade } from 'src/components/animate';
import { AnimateBorder } from 'src/components/animate/animate-border';

interface BorderAnimatedButtonProps extends ButtonProps {
  children: ReactNode;
  animationDuration?: number;
  animationDistance?: number;
  gradientColors?: [string, string];
  outlineOpacity?: number;
}

export default function BorderAnimatedButton({
  children,
  animationDuration = 6,
  animationDistance = 100,
  gradientColors,
  outlineOpacity = 0.1,
  sx,
  ...other
}: BorderAnimatedButtonProps) {
  const theme = useTheme();

  const defaultGradientColors: [string, string] = [
    theme.palette.primary.main,
    theme.palette.primary.light,
  ];

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" width="100%">
      <Box
        component={m.div}
        variants={varFade({ distance: 24 }).inLeft}
        sx={{
          display: 'flex',
          borderRadius: 1.25,
          width: '100%',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: { md: 'flex-end' },
          ...sx,
        }}
      >
        <AnimateBorder
          animate={{
            duration: animationDuration,
            distance: animationDistance,
            color: gradientColors || defaultGradientColors,
            outline: `135deg, ${alpha(theme.palette.common.black, outlineOpacity)}, ${alpha(
              theme.palette.common.black,
              outlineOpacity
            )}`,
          }}
          sx={{ width: 1, height: 1, position: 'absolute' }}
        />
        <Button
          size="large"
          color={theme.palette.mode === 'light' ? 'primary' : 'secondary'}
          variant="text"
          sx={{
            textTransform: 'uppercase',
            borderRadius: 1.25,
          }}
          fullWidth
          {...other}
        >
          {children}
        </Button>
      </Box>
    </Stack>
  );
}
