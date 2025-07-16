import { useTranslate } from 'src/locales';

import { TableHeadCustom } from 'src/components/table';

export default function TransactionsTableHead({
  order,
  orderBy,
  onSort,
}: {
  order?: 'asc' | 'desc';
  orderBy?: string;
  onSort?: (id: string) => void;
}) {
  const { t } = useTranslate();

  const TABLE_HEAD = [
    { id: 'date', label: t('profile.transactions.table.date'), align: 'left' },
    { id: 'name', label: t('profile.transactions.table.name'), align: 'left' },
    { id: 'amount', label: t('profile.transactions.table.amount'), align: 'left' },
    { id: 'status', label: t('profile.transactions.table.status'), align: 'left' },
    { id: 'actions', label: t('profile.transactions.table.actions'), align: 'right' },
  ];

  return <TableHeadCustom order={order} orderBy={orderBy} headLabel={TABLE_HEAD} onSort={onSort} />;
}
