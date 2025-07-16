import { Theme, alpha } from '@mui/material/styles';
import { CardProps, cardClasses } from '@mui/material/Card';

import { borderGradient } from 'src/theme/styles/mixins';

// ----------------------------------------------------------------------

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    blur: true;
    borderGradient: true;
  }
}

declare module '@mui/material/Card' {
  interface CardPropsVariantOverrides {
    blur: true;
    borderGradient: true;
    elevation: true;
    outlined: true;
  }
}

// ----------------------------------------------------------------------

export function card(theme: Theme) {
  return {
    MuiCard: {
      styleOverrides: {
        root: ({
          ownerState,
        }: {
          ownerState: CardProps & {
            variant?: 'blur' | 'borderGradient' | 'elevation' | 'outlined';
          };
        }) => {
          const blurVariant = ownerState.variant === ('blur' as any);
          const borderGradientVariant = ownerState.variant === ('borderGradient' as any);

          return {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,

            // Variant Blur (Glass Effect)
            ...(blurVariant && {
              background: `linear-gradient(135deg, 
                ${alpha(theme.palette.background.default, 0.2)}, 
                ${alpha(theme.palette.background.default, 0.1)})`,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              margin: theme.spacing(2),
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: alpha(theme.palette.common.white, 0.1),
              boxShadow: `0 8px 8px 0 ${alpha(theme.palette.common.black, 0.1)}`,
              '&:hover': {
                boxShadow: `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.2)}`,
                borderColor: alpha(theme.palette.common.white, 0.2),
              },
              transition: theme.transitions.create(['box-shadow', 'border-color'], {
                duration: theme.transitions.duration.shorter,
              }),
            }),

            // Variant Border Gradient
            ...(borderGradientVariant && {
              '&::before': {
                ...borderGradient({
                  color: `to right, ${theme.palette.primary.light}, ${theme.palette.primary.dark}`,
                }),
              },
            }),

            [`&.${cardClasses.root}`]: {
              height: '100%',
            },
          };
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        },
      },
    },
  };
}
