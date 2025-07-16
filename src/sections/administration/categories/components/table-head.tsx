import React from 'react';

import { TableRow, Checkbox, TableCell, TableHead, TableSortLabel } from '@mui/material';

import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

type Order = 'asc' | 'desc';
type OrderBy = 'name' | 'color' | 'createdAt';

type TableHeadProps = {
  order: Order;
  orderBy: OrderBy;
  selectedCategoriesCount: number;
  totalCategoriesCount: number;
  loading: boolean;
  onRequestSort: (property: OrderBy) => void;
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TableHeadComponent({
  order,
  orderBy,
  selectedCategoriesCount,
  totalCategoriesCount,
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
              selectedCategoriesCount > 0 && selectedCategoriesCount < totalCategoriesCount
            }
            checked={totalCategoriesCount > 0 && selectedCategoriesCount === totalCategoriesCount}
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
            {t('sections.categoriesAdministration.table.name')}
          </TableSortLabel>
        </TableCell>
        <TableCell>{t('amount')}</TableCell>
        <TableCell>
          <TableSortLabel
            active={orderBy === 'color'}
            direction={orderBy === 'color' ? order : 'asc'}
            onClick={() => onRequestSort('color')}
          >
            {t('sections.categoriesAdministration.table.color')}
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={orderBy === 'createdAt'}
            direction={orderBy === 'createdAt' ? order : 'asc'}
            onClick={() => onRequestSort('createdAt')}
          >
            {t('sections.categoriesAdministration.table.dates')}
          </TableSortLabel>
        </TableCell>
        <TableCell align="right">{t('sections.categoriesAdministration.table.actions')}</TableCell>
      </TableRow>
    </TableHead>
  );
}
