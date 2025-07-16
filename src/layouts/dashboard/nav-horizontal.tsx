import { memo, useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { alpha, useTheme } from '@mui/material/styles';

import { useOffSetTop } from 'src/hooks/use-off-set-top';

import Scrollbar from 'src/components/scrollbar';
import { NavSectionHorizontal } from 'src/components/nav-section';

import { HEADER } from '../config-layout';
import { useNavData } from './config-navigation';
import HeaderShadow from '../common/header-shadow';

// ----------------------------------------------------------------------

function NavHorizontal() {
  const theme = useTheme();
  const navData = useNavData();
  const [mouseY, setMouseY] = useState(0);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const isScrolled = useOffSetTop(HEADER.H_DESKTOP);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const shouldShowNav = mouseY < 150 || !isScrolled || isHoveringNav;

  return (
    <AnimatePresence>
      {shouldShowNav && (
        <AppBar
          component={m.div}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
          onMouseEnter={() => setIsHoveringNav(true)}
          onMouseLeave={() => setIsHoveringNav(false)}
          sx={{
            top: HEADER.H_DESKTOP_OFFSET,
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
          }}
        >
          <Toolbar
            sx={{
              height: 1,
            }}
          >
            <Scrollbar
              sx={{
                '& .simplebar-content': {
                  display: 'flex',
                },
              }}
            >
              <NavSectionHorizontal
                data={navData}
                /*  slotProps={{
                  currentRole: user?.role,
                }} */
                sx={{
                  ...theme.mixins.toolbar,
                }}
              />
            </Scrollbar>
          </Toolbar>

          <HeaderShadow />
        </AppBar>
      )}
    </AnimatePresence>
  );
}

export default memo(NavHorizontal);
