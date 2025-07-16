import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
}

// SETUP COLORS

export const grey = {
  0: '#FFF8EA', // Old lace - Blanc principal
  100: '#FFF8EA', // Old lace - Off-white/Cream
  200: '#F5F5F5', // Presque blanc
  300: '#E0E0E0', // Gris clair
  400: '#BDBDBD', // Gris moyen clair
  500: '#9E9E9E', // Gris moyen
  600: '#757575', // Gris moyen foncé
  700: '#616161', // Gris foncé
  800: '#424242', // Presque noir
  900: '#21203D', // Space cadet - Dark Blue/Purple
};

export const primary = {
  lighter: '#FFF8EA', // Old lace
  light: '#F5F5F5',
  main: '#21203D', // Space cadet
  dark: '#1A1A2E', // Plus sombre
  darker: '#0F0F1A', // Très sombre
  contrastText: '#FFF8EA', // Old lace
};

export const secondary = {
  lighter: '#FFF8EA', // Old lace
  light: '#F5F5F5',
  main: '#659639', // Asparagus
  dark: '#4A6B2A', // Plus sombre
  darker: '#2F4A1B', // Très sombre
  contrastText: '#FFF8EA', // Old lace
};

export const info = {
  lighter: '#FFF8EA', // Old lace
  light: '#F5F5F5',
  main: '#659639', // Asparagus
  dark: '#4A6B2A',
  darker: '#2F4A1B',
  contrastText: '#FFF8EA', // Old lace
};

export const success = {
  lighter: '#F0F8E8', // Légèrement teinté de vert
  light: '#B8D4A0', // Vert clair
  main: '#659639', // Asparagus
  dark: '#4A6B2A',
  darker: '#2F4A1B',
  contrastText: '#FFF8EA', // Old lace
};

export const warning = {
  lighter: '#FFF8EA', // Old lace
  light: '#FFE4A3', // Jaune clair
  main: '#FFCE57', // Sunglow
  dark: '#E6B94A', // Plus sombre
  darker: '#CC9E3D', // Très sombre
  contrastText: '#21203D', // Space cadet
};

export const error = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
  contrastText: '#FFF8EA', // Old lace
};

export const common = {
  black: '#21203D', // Space cadet
  white: '#FFF8EA', // Old lace
};

export const action = {
  hover: alpha('#21203D', 0.08), // Space cadet avec transparence
  selected: alpha('#21203D', 0.16), // Space cadet avec transparence
  disabled: alpha('#21203D', 0.8), // Space cadet avec transparence
  disabledBackground: alpha('#21203D', 0.24), // Space cadet avec transparence
  focus: alpha('#21203D', 0.24), // Space cadet avec transparence
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

const base = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  grey,
  common,
  divider: alpha('#21203D', 0.2), // Space cadet avec transparence
  action,
};

// ----------------------------------------------------------------------

export function palette(mode: 'light' | 'dark') {
  const light = {
    ...base,
    mode: 'light',
    text: {
      primary: '#21203D', // Space cadet
      secondary: '#659639', // Asparagus
      disabled: '#9E9E9E',
    },
    background: {
      paper: '#FFF8EA', // Old lace
      default: '#FFF8EA', // Old lace
      neutral: '#F5F5F5',
    },
    action: {
      ...base.action,
      active: '#659639', // Asparagus
    },
  };

  const dark = {
    ...base,
    mode: 'dark',
    text: {
      primary: '#FFF8EA', // Old lace
      secondary: '#FFCE57', // Sunglow
      disabled: '#9E9E9E',
    },
    background: {
      paper: '#21203D', // Space cadet
      default: '#21203D', // Space cadet
      neutral: alpha('#659639', 0.12), // Asparagus avec transparence
    },
    action: {
      ...base.action,
      active: '#FFCE57', // Sunglow
    },
  };

  return mode === 'light' ? light : dark;
}
