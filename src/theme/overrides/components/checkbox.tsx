import { Theme } from '@mui/material/styles';
import { CheckboxProps, checkboxClasses } from '@mui/material/Checkbox';

// ----------------------------------------------------------------------

export function checkbox(theme: Theme) {
  const lightMode = theme.palette.mode === 'light';

  return {
    MuiCheckbox: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: CheckboxProps }) => {
          const { color } = ownerState;

          const getCheckedColor = () => {
            if (color === 'default') {
              return lightMode ? theme.palette.grey[900] : theme.palette.common.white;
            }
            return theme.palette.primary.main;
          };

          return {
            padding: theme.spacing(1),
            // Couleur par défaut pour les checkboxes non cochées
            color: lightMode ? theme.palette.grey[500] : theme.palette.grey[300],
            // Couleur pour les checkboxes cochées
            [`&.${checkboxClasses.checked}`]: {
              color: getCheckedColor(),
            },
            // Couleur pour les checkboxes désactivées
            [`&.${checkboxClasses.disabled}`]: {
              color: theme.palette.action.disabled,
            },
            // Couleur au survol
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
            // Amélioration de la visibilité en mode sombre
            ...(lightMode === false && {
              '& .MuiSvgIcon-root': {
                filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.3))',
              },
            }),
          };
        },
      },
    },
  };
}
