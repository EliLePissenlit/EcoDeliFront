import { TableRow, TableCell } from '@mui/material';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { useTranslate } from 'src/locales';

import { Label } from 'src/components/label';

import RowMoreMenu from './row-more-menu';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  allConfigs: any[];
  onSuccess?: VoidFunction;
};

export default function PricingConfigsTableRow({ row, allConfigs, onSuccess }: Props) {
  const { t } = useTranslate();

  const getStatusLabel = (isActive: boolean) => (
    <Label
      variant="soft"
      color={isActive ? 'success' : 'default'}
      sx={{ textTransform: 'uppercase' }}
    >
      {isActive
        ? t('sections.pricingAdministration.configs.status.active')
        : t('sections.pricingAdministration.configs.status.inactive')}
    </Label>
  );

  return (
    <TableRow hover>
      <TableCell>{row.name}</TableCell>

      <TableCell>{fCurrency(row.basePriceSmall / 100)}</TableCell>

      <TableCell>{fCurrency(row.basePriceMedium / 100)}</TableCell>

      <TableCell>{fCurrency(row.basePriceLarge / 100)}</TableCell>

      <TableCell>{fCurrency(row.pricePerKm / 100)}</TableCell>

      <TableCell>{fCurrency(row.pricePerMinute / 100)}</TableCell>

      <TableCell>{getStatusLabel(row.isActive)}</TableCell>

      <TableCell>{fDate(row.createdAt)}</TableCell>

      <TableCell align="right">
        <RowMoreMenu row={row} allConfigs={allConfigs} onSuccess={onSuccess} />
      </TableCell>
    </TableRow>
  );
}
