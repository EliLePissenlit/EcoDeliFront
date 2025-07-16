import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

export default function ThemeToggleButton() {
  const theme = useTheme();
  const settings = useSettingsContext();

  return (
    <IconButton
      onClick={() =>
        settings.onUpdate('themeMode', settings.themeMode === 'light' ? 'dark' : 'light')
      }
      sx={{
        width: 40,
        height: 40,
        ...(theme.palette.mode === 'dark' && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <Iconify
        icon={settings.themeMode === 'light' ? 'eva:moon-fill' : 'eva:sun-fill'}
        sx={{
          color:
            theme.palette.mode === 'light' ? theme.palette.grey[600] : theme.palette.common.white,
          width: 24,
          height: 24,
        }}
      />
    </IconButton>
  );
}
