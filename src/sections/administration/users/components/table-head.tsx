import React from 'react';

import { TableRow, Checkbox, TableCell, TableHead, TableSortLabel } from '@mui/material';

import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

type Order = 'asc' | 'desc';
type OrderBy = 'email' | 'stripeCustomerId' | 'role' | 'lastLoginAt';

type TableHeadProps = {
  order: Order;
  orderBy: OrderBy;
  selectedUsersCount: number;
  totalUsersCount: number;
  loading: boolean;
  onRequestSort: (property: OrderBy) => void;
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TableHeadComponent({
  order,
  orderBy,
  selectedUsersCount,
  totalUsersCount,
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
            indeterminate={selectedUsersCount > 0 && selectedUsersCount < totalUsersCount}
            checked={totalUsersCount > 0 && selectedUsersCount === totalUsersCount}
            onChange={onSelectAll}
            disabled={loading}
          />
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={orderBy === 'email'}
            direction={orderBy === 'email' ? order : 'asc'}
            onClick={() => onRequestSort('email')}
          >
            {t('sections.usersAdministration.table.user')}
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={orderBy === 'stripeCustomerId'}
            direction={orderBy === 'stripeCustomerId' ? order : 'asc'}
            onClick={() => onRequestSort('stripeCustomerId')}
          >
            {t('sections.usersAdministration.table.stripe_customer')}
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={orderBy === 'role'}
            direction={orderBy === 'role' ? order : 'asc'}
            onClick={() => onRequestSort('role')}
          >
            {t('role')}
          </TableSortLabel>
        </TableCell>
        <TableCell>{t('sections.usersAdministration.table.status')}</TableCell>
        <TableCell>
          <TableSortLabel
            active={orderBy === 'lastLoginAt'}
            direction={orderBy === 'lastLoginAt' ? order : 'asc'}
            onClick={() => onRequestSort('lastLoginAt')}
          >
            {t('sections.usersAdministration.table.dates')}
          </TableSortLabel>
        </TableCell>
        <TableCell align="right">{t('sections.usersAdministration.table.actions')}</TableCell>
      </TableRow>
    </TableHead>
  );
}
