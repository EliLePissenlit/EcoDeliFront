import React from 'react';

import { Box, Stack, Button, TextField } from '@mui/material';

import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

type TableHeaderProps = {
  searchQuery: string;
  selectedRelayPointsCount: number;
  onSearchChange: (value: string) => void;
  onCreateRelayPoint: () => void;
};

export default function TableHeader({
  searchQuery,
  selectedRelayPointsCount,
  onSearchChange,
  onCreateRelayPoint,
}: TableHeaderProps) {
  const { t } = useTranslate();

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ mb: 5 }}>
        <TextField
          fullWidth
          placeholder={t('sections.relayPointsAdministration.table.search')}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{
            width: 250,
            '& .MuiInputLabel-root': {
              overflow: 'visible',
              whiteSpace: 'nowrap',
            },
          }}
        />

        <Button variant="gradient" color="primary" onClick={onCreateRelayPoint}>
          {t('sections.relayPointsAdministration.table.create_relay_point')}
        </Button>
      </Stack>
    </Box>
  );
}
