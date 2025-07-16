import React from 'react';

import { TableRow, Checkbox, TableCell, TableHead, TableSortLabel } from '@mui/material';

import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

type Order = 'asc' | 'desc';
type OrderBy = 'name' | 'description' | 'createdAt';

type TableHeadProps = {
  order: Order;
  orderBy: OrderBy;
  selectedRelayPointsCount: number;
  totalRelayPointsCount: number;
  loading: boolean;
  onRequestSort: (property: OrderBy) => void;
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TableHeadComponent({
  order,
  orderBy,
  selectedRelayPointsCount,
  totalRelayPointsCount,
  loading,
  onRequestSort,
  onSelectAll,
}: TableHeadProps) {
  const { t } = useTranslate();

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={
              selectedRelayPointsCount > 0 && selectedRelayPointsCount < totalRelayPointsCount
            }
            checked={
              totalRelayPointsCount > 0 && selectedRelayPointsCount === totalRelayPointsCount
            }
            onChange={onSelectAll}
            disabled={loading}
          />
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={orderBy === 'name'}
            direction={orderBy === 'name' ? order : 'asc'}
            onClick={() => onRequestSort('name')}
          >
            {t('sections.relayPointsAdministration.table.name')}
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={orderBy === 'description'}
            direction={orderBy === 'description' ? order : 'asc'}
            onClick={() => onRequestSort('description')}
          >
            {t('sections.relayPointsAdministration.table.description')}
          </TableSortLabel>
        </TableCell>
        <TableCell>{t('sections.relayPointsAdministration.table.opening_days')}</TableCell>
        <TableCell>
          <TableSortLabel
            active={orderBy === 'createdAt'}
            direction={orderBy === 'createdAt' ? order : 'asc'}
            onClick={() => onRequestSort('createdAt')}
          >
            {t('sections.relayPointsAdministration.table.dates')}
          </TableSortLabel>
        </TableCell>
        <TableCell align="right">{t('sections.relayPointsAdministration.table.actions')}</TableCell>
      </TableRow>
    </TableHead>
  );
}
