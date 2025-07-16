import React, { useState } from 'react';

import { Menu, MenuItem, IconButton } from '@mui/material';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';

import { ListUsersDocument, useSuspendUserMutation } from 'src/types/graphql/typeDefs';

// ----------------------------------------------------------------------

type RowMoreMenuProps = {
  user: {
    id: string;
    isSuspended: boolean;
    email: string;
  };
  onSuspendSuccess: () => void;
  onContactUser: (userId: string) => void;
};

export default function RowMoreMenu({ user, onSuspendSuccess, onContactUser }: RowMoreMenuProps) {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [suspendUser] = useSuspendUserMutation({
    refetchQueries: [ListUsersDocument],
    onCompleted: () => {
      enqueueSnackbar(
        t(
          user.isSuspended
            ? 'sections.usersAdministration.notifications.unsuspend_success'
            : 'sections.usersAdministration.notifications.suspend_success'
        ),
        {
          variant: 'success',
        }
      );
      onSuspendSuccess();
    },
    onError: () => {
      enqueueSnackbar(
        t(
          user.isSuspended
            ? 'sections.usersAdministration.notifications.unsuspend_error'
            : 'sections.usersAdministration.notifications.suspend_error'
        ),
        {
          variant: 'error',
        }
      );
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSuspend = async () => {
    await suspendUser({
      variables: {
        id: user.id,
      },
    });
    handleClose();
  };

  const handleContactUser = () => {
    onContactUser(user.id);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleContactUser}>
          <Iconify icon="eva:message-circle-fill" sx={{ mr: 2 }} />
          {t('sections.usersAdministration.actions.contact')}
        </MenuItem>
        <MenuItem
          onClick={handleSuspend}
          sx={{ color: user.isSuspended ? 'success.main' : 'error.main' }}
        >
          <Iconify
            icon={user.isSuspended ? 'eva:play-circle-fill' : 'eva:stop-circle-fill'}
            sx={{ mr: 2 }}
          />
          {user.isSuspended
            ? t('sections.usersAdministration.actions.unsuspend')
            : t('sections.usersAdministration.actions.suspend')}
        </MenuItem>
      </Menu>
    </>
  );
}
