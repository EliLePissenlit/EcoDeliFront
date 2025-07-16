import React, { useState } from 'react';

import { Menu, MenuItem, IconButton } from '@mui/material';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type RowMoreMenuProps = {
  relayPoint: {
    id: string;
    name: string;
  };
  onEditRelayPoint: (relayPoint: any) => void;
  onDeleteRelayPoint: (relayPointId: string) => void;
};

export default function RowMoreMenu({
  relayPoint,
  onEditRelayPoint,
  onDeleteRelayPoint,
}: RowMoreMenuProps) {
  const { t } = useTranslate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEditRelayPoint(relayPoint);
    handleClose();
  };

  const handleDelete = () => {
    onDeleteRelayPoint(relayPoint.id);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          {t('sections.relayPointsAdministration.actions.edit')}
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-fill" sx={{ mr: 2 }} />
          {t('sections.relayPointsAdministration.actions.delete')}
        </MenuItem>
      </Menu>
    </>
  );
}
