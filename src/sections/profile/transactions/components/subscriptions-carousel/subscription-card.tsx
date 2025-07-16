import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';

import { Transaction } from 'src/types/graphql/typeDefs';

import SubscriptionActions from './subscription-actions';
import SubscriptionStatusBadge from './subscription-status-badge';

type Props = {
  subscription: Transaction;
};

export default function SubscriptionCard({ subscription }: Props) {
  const { t } = useTranslate();

  const renderSubscriptionInfo = (
    icon: string,
    label: string,
    value: string,
    tooltipText?: string
  ) => (
    <Stack direction="row" spacing={1} alignItems="center">
      <Tooltip title={tooltipText || ''}>
        <Iconify icon={icon} width={20} sx={{ color: 'text.secondary' }} />
      </Tooltip>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {label}: {value}
      </Typography>
    </Stack>
  );

  return (
    <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
      {/* Contenu principal */}
      <Stack spacing={3} sx={{ flex: 1 }}>
        {/* En-tête avec titre, badge de statut et actions */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h6">{subscription.name}</Typography>
            <SubscriptionStatusBadge
              status={subscription.status}
              autoRenew={subscription.autoRenew}
            />
          </Stack>
        </Stack>

        <Stack spacing={2}>
          {renderSubscriptionInfo(
            'mdi:currency-eur',
            t('profile.transactions.table.amount'),
            fCurrency(subscription.amountInCents / 100)
          )}

          {subscription.currentPeriodEnd &&
            renderSubscriptionInfo(
              'mdi:calendar-end',
              t('profile.transactions.subscriptions.end_date'),
              new Date(subscription.currentPeriodEnd).toLocaleDateString()
            )}

          {/* Renouvellement automatique */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip
              title={
                subscription.autoRenew
                  ? t('profile.transactions.subscriptions.auto_renew_enabled')
                  : t('profile.transactions.subscriptions.auto_renew_disabled')
              }
            >
              <Iconify
                icon={subscription.autoRenew ? 'mdi:sync' : 'mdi:sync-off'}
                width={20}
                sx={{
                  color: subscription.autoRenew ? 'success.main' : 'text.secondary',
                }}
              />
            </Tooltip>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t('profile.transactions.subscriptions.auto_renew')}:{' '}
              {subscription.autoRenew
                ? t('profile.transactions.subscriptions.enabled')
                : t('profile.transactions.subscriptions.disabled')}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <SubscriptionActions subscription={subscription} />
    </Stack>
  );
}
