import { createTheme } from '@mui/material/styles';

const baseTheme = {
  palette: {
    primary: { // vert
      main: '#659639',
      light: '#8ab35f',
      dark: '#4a6d2a', 
    },
    secondary: { // jaune 
      main: '#ffce57',
      light: '#ffdb8a',
      dark: '#e6b94e',
    },
  },
  typography: {
    fontFamily: '"Futura display", "Roboto", "DM Sans", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none' as const,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
};

const theme = createTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    mode: 'light',
    background: {
      default: '#fff8ea', // beige clair
      paper: '#e5dfd2',
    },
  },
});

const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    mode: 'dark',
    background: {
      default: '#21203d', // bleu foncé
      paper: '#131324',
    },
  },
});

export { theme, darkTheme }; 