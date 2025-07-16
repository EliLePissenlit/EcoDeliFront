import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

type PresetType = 'default' | 'purple' | 'mint' | 'orange' | 'red' | 'cyan' | 'pink';

const defaultPalette = {
  lighter: '#F5F5F5',
  light: '#E0E0E0',
  main: '#212121',
  dark: '#000000',
  darker: '#000000',
  contrastText: '#FFFFFF',
};

const purple = {
  lighter: '#EBD6FD',
  light: '#B985F4',
  main: '#7B1FA2',
  dark: '#4A0072',
  darker: '#2A0044',
  contrastText: '#FFFFFF',
};

const mint = {
  lighter: '#D4F5E9',
  light: '#84E4C5',
  main: '#00B69B',
  dark: '#007867',
  darker: '#004D40',
  contrastText: '#FFFFFF',
};

const orange = {
  lighter: '#FFF3E0',
  light: '#FFB74D',
  main: '#FF5722',
  dark: '#D84315',
  darker: '#BF360C',
  contrastText: '#FFFFFF',
};

const red = {
  lighter: '#FFE5E5',
  light: '#FF8A8A',
  main: '#E53935',
  dark: '#B71C1C',
  darker: '#7F0000',
  contrastText: '#FFFFFF',
};

const cyan = {
  lighter: '#E0F7FA',
  light: '#80DEEA',
  main: '#00BCD4',
  dark: '#0097A7',
  darker: '#006064',
  contrastText: '#FFFFFF',
};

const pink = {
  lighter: '#FCE4EC',
  light: '#F8BBD0',
  main: '#E91E63',
  dark: '#C2185B',
  darker: '#880E4F',
  contrastText: '#FFFFFF',
};

const yellow = {
  lighter: '#FFF9E1',
  light: '#FFE082',
  main: '#FFD54F',
  dark: '#FFC107',
  darker: '#FFA000',
  contrastText: '#FFFFFF',
};

const green = {
  lighter: '#E0F2F1',
  light: '#81C784',
  main: '#4CAF50',
  dark: '#388E3C',
  darker: '#1B5E20',
  contrastText: '#FFFFFF',
};

export function createPresets(preset: PresetType) {
  const primaryColor = getPrimary(preset);

  const theme = {
    palette: {
      primary: primaryColor,
    },
    customShadows: {
      primary: `0 8px 16px 0 ${alpha(`${primaryColor?.main}`, 0.24)}`,
    },
  };

  return {
    ...theme,
  };
}

// ----------------------------------------------------------------------

export const presetOptions = [
  { name: 'default', value: defaultPalette.main },
  { name: 'purple', value: purple.main },
  { name: 'mint', value: mint.main },
  { name: 'orange', value: orange.main },
  { name: 'red', value: red.main },
  { name: 'cyan', value: cyan.main },
  { name: 'pink', value: pink.main },
  { name: 'yellow', value: yellow.main },
  { name: 'green', value: green.main },
];

export function getPrimary(preset: PresetType) {
  return {
    default: defaultPalette,
    purple,
    mint,
    orange,
    red,
    cyan,
    pink,
    yellow,
    green,
  }[preset];
}
