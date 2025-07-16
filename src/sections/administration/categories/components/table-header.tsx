import React from 'react';

import { Box, Stack, Button, TextField } from '@mui/material';

import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

type TableHeaderProps = {
  searchQuery: string;
  selectedCategoriesCount: number;
  onSearchChange: (value: string) => void;
  onCreateCategory: () => void;
};

export default function TableHeader({
  searchQuery,
  selectedCategoriesCount,
  onSearchChange,
  onCreateCategory,
}: TableHeaderProps) {
  const { t } = useTranslate();

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ mb: 5 }}>
        <TextField
          fullWidth
          placeholder={t('sections.categoriesAdministration.table.search')}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{
            width: 250,
            '& .MuiInputLabel-root': {
              overflow: 'visible',
              whiteSpace: 'nowrap',
            },
          }}
        />

        <Button variant="gradient" color="primary" onClick={onCreateCategory}>
          {t('sections.categoriesAdministration.table.create_category')}
        </Button>
      </Stack>
    </Box>
  );
}
