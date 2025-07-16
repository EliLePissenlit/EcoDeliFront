import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import { TableBody } from '@mui/material';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { useTranslate } from 'src/locales';

import { EmptyContent } from 'src/components/empty-content';
import { useTable, TablePaginationCustom } from 'src/components/table';

import { useGetUserTransactionsQuery } from 'src/types/graphql/typeDefs';

import TableRow from './table-row';
import TableHead from './table-head';

export default function TransactionsTable() {
  const { t } = useTranslate();
  const table = useTable();
  const { data } = useGetUserTransactionsQuery();

  const transactions = (data?.getUserTransactions || []).filter(
    (transaction) => !transaction.isSubscription
  );

  return (
    <Card variant="blur" sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ px: 3, pt: 3, mb: 2 }}>
        {t('profile.transactions.title')}
      </Typography>
      <Typography variant="body2" sx={{ px: 3, mb: 3, color: 'text.secondary' }}>
        {t('profile.transactions.description')}
      </Typography>

      <Box sx={{ overflow: 'auto' }}>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table size="small">
            <>
              {transactions.length === 0 ? (
                <EmptyContent
                  title={t('profile.transactions.no_data.title')}
                  description={t('profile.transactions.no_data.description')}
                />
              ) : (
                <>
                  <TableHead order={table.order} orderBy={table.orderBy} onSort={table.onSort} />

                  <TableBody>
                    {transactions
                      .slice(
                        table.page * table.rowsPerPage,
                        table.page * table.rowsPerPage + table.rowsPerPage
                      )
                      .map((transaction) => (
                        <TableRow key={transaction.id} transaction={transaction} />
                      ))}
                  </TableBody>
                </>
              )}
            </>
          </Table>
        </TableContainer>
      </Box>

      <TablePaginationCustom
        count={transactions.length}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />
    </Card>
  );
}
