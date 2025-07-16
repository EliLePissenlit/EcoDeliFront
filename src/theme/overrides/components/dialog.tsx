import { Theme } from '@mui/material/styles';
import { DialogProps } from '@mui/material/Dialog';

// ----------------------------------------------------------------------

export function dialog(theme: Theme) {
  return {
    MuiDialog: {
      styleOverrides: {
        paper: ({ ownerState }: { ownerState: DialogProps }) => ({
          boxShadow: theme.customShadows.dialog,
          borderRadius: theme.shape.borderRadius * 2,
          ...(!ownerState.fullScreen && {
            margin: theme.spacing(2),
          }),
        }),
        paperFullScreen: {
          borderRadius: 0,
        },
        backdrop: {
          backgroundColor:
            theme.palette.mode === 'dark'
              ? 'rgba(0, 0, 0, 0.9)' // Noir très opaque en mode sombre
              : 'rgba(0, 0, 0, 0.6)', // Noir plus opaque en mode clair
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(0, 3),
        },
        dividers: {
          borderTop: 0,
          borderBottomStyle: 'dashed',
          paddingBottom: theme.spacing(3),
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
          '& > :not(:first-of-type)': {
            marginLeft: theme.spacing(1.5),
          },
        },
      },
    },
  };
}
