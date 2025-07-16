import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { fDateTime } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { Transaction } from 'src/types/graphql/typeDefs';

import RowActions from './row-actions';
import StatusBadge from './status-badge';

type Props = {
  transaction: Transaction;
};

export default function TransactionsTableRow({ transaction }: Props) {
  return (
    <TableRow>
      <TableCell>{fDateTime(transaction.createdAt)}</TableCell>
      <TableCell>{transaction.name}</TableCell>
      <TableCell>{fCurrency(transaction.amountInCents / 100)}</TableCell>
      <TableCell>
        <StatusBadge
          status={transaction.status}
          isSubscription={transaction.isSubscription}
          autoRenew={transaction.autoRenew}
        />
      </TableCell>
      <TableCell align="right">
        <RowActions transaction={transaction} />
      </TableCell>
    </TableRow>
  );
}
