import React from 'react';

import { Box, Stack, Button, TextField } from '@mui/material';

import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

type TableHeaderProps = {
  searchQuery: string;
  selectedUsersCount: number;
  onSearchChange: (value: string) => void;
  onContactSelected: () => void;
};

export default function TableHeader({
  searchQuery,
  selectedUsersCount,
  onSearchChange,
  onContactSelected,
}: TableHeaderProps) {
  const { t } = useTranslate();

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ mb: 5 }}>
        <TextField
          fullWidth
          placeholder={t('sections.usersAdministration.table.search')}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{
            width: 250,
            '& .MuiInputLabel-root': {
              overflow: 'visible',
              whiteSpace: 'nowrap',
            },
          }}
        />

        {selectedUsersCount > 0 && (
          <Button variant="gradient" color="primary" onClick={onContactSelected}>
            {t('sections.usersAdministration.table.contact_selected', {
              count: selectedUsersCount,
            })}
          </Button>
        )}
      </Stack>
    </Box>
  );
}
