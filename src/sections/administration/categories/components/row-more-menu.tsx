import React, { useState } from 'react';

import { Menu, MenuItem, IconButton } from '@mui/material';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type RowMoreMenuProps = {
  category: {
    id: string;
    name: string;
  };
  onEditCategory: (category: any) => void;
  onDeleteCategory: (categoryId: string) => void;
};

export default function RowMoreMenu({
  category,
  onEditCategory,
  onDeleteCategory,
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
    onEditCategory(category);
    handleClose();
  };

  const handleDelete = () => {
    onDeleteCategory(category.id);
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
          {t('sections.categoriesAdministration.actions.edit')}
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-fill" sx={{ mr: 2 }} />
          {t('sections.categoriesAdministration.actions.delete')}
        </MenuItem>
      </Menu>
    </>
  );
}
