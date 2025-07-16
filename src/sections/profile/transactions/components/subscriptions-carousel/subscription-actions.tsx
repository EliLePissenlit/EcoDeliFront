import { useSnackbar } from 'notistack';

import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import { useAuth } from 'src/hooks/use-auth';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';

import {
  Transaction,
  TransactionStatus,
  useCancelSubscriptionMutation,
  GetActiveSubscriptionsDocument,
} from 'src/types/graphql/typeDefs';

type Props = {
  subscription: Transaction;
};

export default function SubscriptionActions({ subscription }: Props) {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();

  const [cancelSubscription] = useCancelSubscriptionMutation({
    refetchQueries: [{ query: GetActiveSubscriptionsDocument }],
  });
  const { user } = useAuth();

  const handleCancelSubscription = async () => {
    try {
      await cancelSubscription({
        variables: {
          input: {
            email: user.email,
            immediately: true,
          },
        },
      });
      enqueueSnackbar(t('profile.transactions.cancel_success'), { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(t('profile.transactions.cancel_error'), { variant: 'error' });
    }
  };

  const handleDownloadInvoice = () => {
    if (subscription.relatedInvoice) {
      window.open(subscription.relatedInvoice, '_blank');
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      {subscription.status === TransactionStatus.SubscriptionActive && subscription.autoRenew && (
        <Tooltip title={t('profile.transactions.actions.cancel')}>
          <IconButton color="error" onClick={handleCancelSubscription}>
            <Iconify icon="mdi:cancel" />
          </IconButton>
        </Tooltip>
      )}

      {subscription.relatedInvoice && (
        <Tooltip title={t('profile.transactions.actions.download')}>
          <IconButton onClick={handleDownloadInvoice}>
            <Iconify icon="mdi:download" />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
}
