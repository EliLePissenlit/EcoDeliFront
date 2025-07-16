import { Chip, ChipProps } from '@mui/material';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';

import { TransactionStatus } from 'src/types/graphql/typeDefs';

interface SubscriptionStatusBadgeProps extends Omit<ChipProps, 'label'> {
  status: TransactionStatus;
  autoRenew?: boolean | null;
}

export default function SubscriptionStatusBadge({
  status,
  autoRenew,
  ...other
}: SubscriptionStatusBadgeProps) {
  const { t } = useTranslate();

  const getColor = (): ChipProps['color'] => {
    if (status === TransactionStatus.Succeeded) {
      return autoRenew ? 'success' : 'warning';
    }
    if (status === TransactionStatus.SubscriptionCanceled) return 'error';
    if (status === TransactionStatus.SubscriptionExpired) return 'warning';
    if (status === TransactionStatus.SubscriptionInitiated) return 'info';
    if (status === TransactionStatus.SubscriptionActive) return 'success';

    return 'default';
  };

  const getLabel = (): string => {
    if (status === TransactionStatus.SubscriptionCanceled)
      return t('profile.transactions.subscriptions.canceled');
    if (status === TransactionStatus.SubscriptionExpired)
      return t('profile.transactions.subscriptions.expired');
    if (status === TransactionStatus.SubscriptionInitiated)
      return t('profile.transactions.subscriptions.initiated');
    if (status === TransactionStatus.SubscriptionActive)
      return t('profile.transactions.subscriptions.active');

    return t('profile.transactions.subscriptions.unknown');
  };

  const getIcon = () => {
    if (status === TransactionStatus.SubscriptionCanceled) return <Iconify icon="eva:close-fill" />;
    if (status === TransactionStatus.SubscriptionExpired) return <Iconify icon="eva:clock-fill" />;
    if (status === TransactionStatus.SubscriptionInitiated)
      return <Iconify icon="eva:refresh-fill" />;
    if (status === TransactionStatus.SubscriptionActive)
      return <Iconify icon="eva:checkmark-fill" />;

    return <Iconify icon="eva:question-mark-fill" />;
  };

  return (
    <Chip
      size="small"
      variant="soft"
      label={getLabel()}
      color={getColor()}
      icon={getIcon()}
      {...other}
    />
  );
}
