import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';

import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
import { useGeolocation } from 'src/hooks/use-geolocation';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';
import { useSettingsContext } from 'src/components/settings';
import ThemeToggleButton from 'src/components/theme-toggle-button';
import ScrollProgress from 'src/components/scroll-progress/scroll-progress';
import { useScrollProgress } from 'src/components/scroll-progress/use-scroll-progress';

import { NAV, HEADER } from '../config-layout';
import AccountPopover from '../common/account-popover';
import LanguagePopover from '../common/language-popover';
import NotificationsPopover from '../common/notifications-popover';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();

  const settings = useSettingsContext();

  const isNavHorizontal = settings.themeLayout === 'horizontal';

  const isNavMini = settings.themeLayout === 'mini';

  const lgUp = useResponsive('up', 'lg');

  const offset = useOffSetTop(HEADER.H_DESKTOP);

  const offsetTop = offset && !isNavHorizontal;

  const { scrollYProgress } = useScrollProgress('container');

  const { getCurrentLocation, isGettingLocation } = useGeolocation();

  const handleGetLocation = async () => {
    const result = await getCurrentLocation();
    if (result?.success) {
      // Optionnel : afficher un message de succès ou mettre à jour l'interface
      console.log('Position mise à jour:', result.address);
    }
  };

  const renderContent = (
    <>
      {lgUp && isNavHorizontal && <Logo />}

      {!lgUp && (
        <IconButton onClick={onOpenNav}>
          <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
        </IconButton>
      )}

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
      >
        <Tooltip title="Mettre à jour ma position">
          <IconButton
            onClick={handleGetLocation}
            disabled={isGettingLocation}
            sx={{
              width: 40,
              height: 40,
              ...(theme.palette.mode === 'dark' && {
                bgcolor: 'action.selected',
              }),

              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <Iconify
              icon={isGettingLocation ? 'mdi:loading' : 'mdi:crosshairs-gps'}
              sx={{
                color:
                  theme.palette.mode === 'light'
                    ? theme.palette.grey[600]
                    : theme.palette.common.white,
                width: 24,
                height: 24,
              }}
            />
          </IconButton>
        </Tooltip>

        <ThemeToggleButton />

        <LanguagePopover />

        <NotificationsPopover />

        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        background: `linear-gradient(135deg, 
          ${alpha(theme.palette.background.default, 0.4)}, 
          ${alpha(theme.palette.background.default, 0.2)}
        )`,
        borderBottom: `1px solid ${alpha(
          theme.palette.common.white,
          theme.palette.mode === 'light' ? 0.02 : 0.04
        )}`,
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
          height: HEADER.H_DESKTOP,
          ...(offsetTop && {
            height: HEADER.H_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: 'transparent',
            height: HEADER.H_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${alpha(theme.palette.divider, 0.2)}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <ScrollProgress scrollYProgress={scrollYProgress} />
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
