import { Theme } from '@mui/material/styles';

import { textGradient } from 'src/theme/styles/mixins';

// ----------------------------------------------------------------------

export function typography(theme: Theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
        gradient: {
          ...textGradient(`to right, ${theme.palette.primary.light}, ${theme.palette.grey[800]}`),
        },
        gradientMini: {
          ...textGradient(`to right, ${theme.palette.primary.light}, ${theme.palette.grey[700]}`),
        },
      },
    },
  };
}
