import React from 'react';

import { Box, Chip, Stack, TableRow, Checkbox, TableCell, Typography } from '@mui/material';

import { fDateTime } from 'src/utils/format-time';

import { useTranslate } from 'src/locales';

import RowMoreMenu from './row-more-menu';

// ----------------------------------------------------------------------

type RelayPoint = {
  id: string;
  name: string;
  description: string;
  openingDays: Array<{
    day: string;
    open: string;
    close: string;
    isOpen: boolean;
  }>;
  createdAt: string;
  updatedAt: string;
  fileUrl?: string;
};

type RelayPointRowProps = {
  relayPoint: RelayPoint;
  isSelected: boolean;
  onSelectRelayPoint: (relayPointId: string) => void;
  onEditRelayPoint: (relayPoint: RelayPoint) => void;
  onDeleteRelayPoint: (relayPointId: string) => void;
};

export default function RelayPointRow({
  relayPoint,
  isSelected,
  onSelectRelayPoint,
  onEditRelayPoint,
  onDeleteRelayPoint,
}: RelayPointRowProps) {
  const { t } = useTranslate();

  const openDaysCount = relayPoint.openingDays.filter((day) => day.isOpen).length;

  return (
    <TableRow key={relayPoint.id}>
      <TableCell padding="checkbox">
        <Checkbox checked={isSelected} onChange={() => onSelectRelayPoint(relayPoint.id)} />
      </TableCell>
      <TableCell>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1,
              backgroundColor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {relayPoint.fileUrl ? (
              <Box
                component="img"
                src={relayPoint.fileUrl}
                alt={relayPoint.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Typography variant="caption" color="white">
                {relayPoint.name.charAt(0).toUpperCase()}
              </Typography>
            )}
          </Box>
          <Typography>{relayPoint.name}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
          {relayPoint.description}
        </Typography>
      </TableCell>
      <TableCell>
        <Chip
          label={`${openDaysCount}/7 jours`}
          color={openDaysCount > 0 ? 'success' : 'default'}
          size="small"
        />
      </TableCell>
      <TableCell>
        <Stack spacing={0.5}>
          <Typography variant="body2" color="text.secondary">
            {t('sections.relayPointsAdministration.table.created')}:{' '}
            {fDateTime(relayPoint.createdAt) || '-'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('sections.relayPointsAdministration.table.updated')}:{' '}
            {fDateTime(relayPoint.updatedAt) || '-'}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align="right">
        <RowMoreMenu
          relayPoint={relayPoint}
          onEditRelayPoint={onEditRelayPoint}
          onDeleteRelayPoint={onDeleteRelayPoint}
        />
      </TableCell>
    </TableRow>
  );
}
