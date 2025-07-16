import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { useAuth } from 'src/hooks/use-auth';
import { useRouter } from 'src/hooks/use-router';
import { useBoolean } from 'src/hooks/use-boolean';

import i18n from 'src/locales/i18n';
import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import { varHover } from 'src/components/animate';
import { AnimateAvatar } from 'src/components/animate/animate-avatar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import ContactDialog from 'src/sections/contact/contact-dialog';

// ----------------------------------------------------------------------

const AUTHENTICATED_OPTIONS = [
  {
    label: i18n.t('layout.account_popover.profile'),
    linkTo: paths.profile,
  },
  {
    label: i18n.t('sections.contact.title'),
    action: 'contact',
  },
];

const UNAUTHENTICATED_OPTIONS = [
  {
    label: i18n.t('auth.sign_in.title'),
    linkTo: paths.auth.signIn,
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { t } = useTranslate();
  const router = useRouter();
  const { logout, user } = useAuth();
  const popover = usePopover();
  const contactDialog = useBoolean();

  const handleLogout = async () => {
    try {
      await logout();
      popover.onClose();
      router.replace('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickItem = (option: { label: string; linkTo?: string; action?: string }) => {
    popover.onClose();

    if (option.action === 'contact') {
      contactDialog.onTrue();
    } else if (option.linkTo) {
      router.push(option.linkTo);
    }
  };

  const options = user ? AUTHENTICATED_OPTIONS : UNAUTHENTICATED_OPTIONS;

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        {user ? (
          <AnimateAvatar
            slotProps={{
              avatar: {
                src: user?.avatar,
              },
            }}
          >
            {user?.email?.charAt(0).toUpperCase()}
          </AnimateAvatar>
        ) : (
          <Iconify icon="mdi:person" />
        )}
      </IconButton>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0 }}>
        {user && (
          <>
            <Box sx={{ p: 2, pb: 1.5 }}>
              <Typography variant="subtitle2" noWrap>
                {user?.email}
              </Typography>
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />
          </>
        )}

        <Stack sx={{ p: 1 }}>
          {options.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option)}>
              {user ? option.label : t(option.label)}
            </MenuItem>
          ))}
        </Stack>

        {user && (
          <>
            <Divider sx={{ borderStyle: 'dashed' }} />

            <MenuItem
              onClick={handleLogout}
              sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
            >
              {t('layout.account_popover.logout')}
            </MenuItem>
          </>
        )}
      </CustomPopover>

      <ContactDialog open={contactDialog.value} onClose={contactDialog.onFalse} />
    </>
  );
}
