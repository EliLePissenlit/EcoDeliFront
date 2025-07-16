import { forwardRef } from 'react';

import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useAuth } from 'src/hooks/use-auth';
import { useResponsive } from 'src/hooks/use-responsive';

import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const theme = useTheme();
    const settings = useSettingsContext();
    const isMobile = useResponsive('down', 'sm');
    const { isAuthenticated } = useAuth();

    const isNavHorizontal = settings.themeLayout === 'horizontal';
    const isMini = settings.themeLayout === 'mini';

    const logoDependingOnLayout = () => {
      if (theme.palette.mode === 'dark') {
        return '/logo/light.svg';
      }

      return '/logo/dark.svg';
    };

    const sxLogoDependingOnLayout = () => {
      if (isMini || isMobile) {
        return { height: 60, width: 60, display: 'block' };
      }
      if (isNavHorizontal) {
        return { height: 60, width: 60, display: 'block' };
      }

      return { height: 250, width: 250, display: 'block' };
    };

    const logo = <Box component="img" src={logoDependingOnLayout()} sx={sxLogoDependingOnLayout} />;

    if (disabledLink) return logo;

    return (
      <Link
        component={RouterLink}
        href={isAuthenticated ? paths.dashboard : paths.auth.signIn}
        sx={{ display: 'contents' }}
      >
        {logo}
      </Link>
    );
  }
);

export default Logo;
