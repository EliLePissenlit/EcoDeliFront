import { m, AnimatePresence } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';

import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';
import LanguagePopover from 'src/layouts/common/language-popover';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify/iconify';
import ThemeToggleButton from 'src/components/theme-toggle-button';
import ScrollProgress from 'src/components/scroll-progress/scroll-progress';
import { useScrollProgress } from 'src/components/scroll-progress/use-scroll-progress';

// import SettingsButton from '../common/settings-button';

export function SimpleHeader() {
  const theme = useTheme();
  const { t } = useTranslate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { scrollYProgress } = useScrollProgress('container');
  const closeTimeoutRef = useRef<NodeJS.Timeout>();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    handleClose();
    setTimeout(() => {
      window.location.href = path;
    }, 100);
  };

  useEffect(
    () => () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    },
    []
  );

  return (
    <AnimatePresence>
      <ScrollProgress scrollYProgress={scrollYProgress} color="primary" size={4} />
      <AppBar
        component={m.div}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
        sx={{
          top: 0,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          background: `linear-gradient(135deg, 
              ${theme.palette.background.default}80 0%, 
              ${theme.palette.background.paper}80 100%
            )`,
          borderBottom: `1px solid ${theme.palette.divider}20`,
          boxShadow: `0 4px 16px ${theme.palette.common.black}10`,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            height: {
              xs: 64,
              md: 80,
            },
            transition: theme.transitions.create(['height'], {
              duration: theme.transitions.duration.shorter,
            }),
          }}
        >
          <Logo />

          <Stack direction="row" alignItems="center" spacing={2}>
            <ThemeToggleButton />
            <LanguagePopover />

            <Button
              component={RouterLink}
              to={paths.auth.signIn}
              variant="gradient"
              color="primary"
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
                boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                '&:hover': {
                  boxShadow: `0 6px 16px ${theme.palette.primary.main}60`,
                },
              }}
            >
              {t('components.button.sign_in')}
            </Button>

            <IconButton
              sx={{
                display: { md: 'none' },
                '&:hover': {
                  background: `${theme.palette.primary.main}20`,
                },
              }}
              onClick={handleMenu}
              color="inherit"
            >
              <Iconify icon="eva:menu-2-fill" />
            </IconButton>
          </Stack>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1,
                width: '100%',
                maxWidth: '100%',
                borderRadius: 0,
                backdropFilter: 'none',
                WebkitBackdropFilter: 'none',
                background: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: `0 8px 32px ${theme.palette.common.black}10`,
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem
              onClick={() => handleNavigate(paths.auth.signIn)}
              sx={{
                py: 2,
                mt: 1,
                bgcolor: `${theme.palette.primary.main}20`,
                '&:hover': {
                  bgcolor: `${theme.palette.primary.main}40`,
                },
              }}
            >
              <ListItemIcon>
                <Iconify icon="eva:log-in-fill" />
              </ListItemIcon>
              <ListItemText
                primary={t('components.button.sign_in')}
                primaryTypographyProps={{
                  sx: {
                    color: 'text.primary',
                    fontWeight: 'fontWeightBold',
                  },
                }}
              />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </AnimatePresence>
  );
}
