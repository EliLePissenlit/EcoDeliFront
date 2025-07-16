import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';

import { Transaction } from 'src/types/graphql/typeDefs';

type Props = {
  transaction: Transaction;
};

export default function RowActions({ transaction }: Props) {
  const { t } = useTranslate();

  const handleDownloadInvoice = () => {
    if (transaction.relatedInvoice) {
      window.open(transaction.relatedInvoice, '_blank');
    }
  };

  return (
    <>
      {transaction.relatedInvoice && (
        <Tooltip title={t('profile.transactions.actions.download')}>
          <IconButton onClick={handleDownloadInvoice}>
            <Iconify icon="mdi:download" />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
}
