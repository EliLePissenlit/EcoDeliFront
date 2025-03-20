import { createTheme, ThemeOptions } from '@mui/material/styles';
import { COLORS } from '../constants/colors';

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: COLORS.PRIMARY_GREEN,
    },
    secondary: {
      main: COLORS.DYNAMIC_YELLOW,
    },
    text: {
      primary: COLORS.NIGHT_BLUE,
    },
    background: {
      default: COLORS.SOFT_BEIGE,
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'DM Sans, sans-serif',
    h1: {
      fontFamily: 'Futura Display, sans-serif',
    },
    h2: {
      fontFamily: 'Futura Display, sans-serif',
    },
    h3: {
      fontFamily: 'Futura Display, sans-serif',
    },
    h4: {
      fontFamily: 'Futura Display, sans-serif',
    },
    h5: {
      fontFamily: 'Futura Display, sans-serif',
    },
    h6: {
      fontFamily: 'Futura Display, sans-serif',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
};

const darkThemeOptions: ThemeOptions = {
  ...themeOptions,
  palette: {
    ...themeOptions.palette,
    mode: 'dark',
    background: {
      default: COLORS.NIGHT_BLUE,
      paper: '#2f2f3d',
    },
    text: {
      primary: '#ffffff',
      secondary: COLORS.DYNAMIC_YELLOW,
    },
  },
};

export const theme = createTheme(themeOptions);
export const darkTheme = createTheme(darkThemeOptions); 