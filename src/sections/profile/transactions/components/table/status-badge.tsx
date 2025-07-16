import { Chip, ChipProps } from '@mui/material';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';

import { TransactionStatus } from 'src/types/graphql/typeDefs';

interface StatusBadgeProps extends Omit<ChipProps, 'label'> {
  status: TransactionStatus;
  isSubscription: boolean;
  autoRenew?: boolean | null;
}

export default function StatusBadge({
  status,
  isSubscription,
  autoRenew,
  ...other
}: StatusBadgeProps) {
  const { t } = useTranslate();

  const getColor = (): ChipProps['color'] => {
    if (status === TransactionStatus.Succeeded) return 'success';
    if (status === TransactionStatus.Failed) return 'error';
    if (status === TransactionStatus.Pending) return 'warning';
    if (status === TransactionStatus.Processing) return 'info';
    if (status === TransactionStatus.Canceled) return 'error';

    return 'info';
  };

  const getLabel = (): string => {
    if (status === TransactionStatus.Succeeded) return t('profile.transactions.status.succeeded');
    if (status === TransactionStatus.Failed) return t('profile.transactions.status.failed');
    if (status === TransactionStatus.Pending) return t('profile.transactions.status.pending');
    if (status === TransactionStatus.Processing) return t('profile.transactions.status.processing');
    if (status === TransactionStatus.Canceled) return t('profile.transactions.status.canceled');

    return t('profile.transactions.status.unknown');
  };

  const getIcon = () => {
    if (status === TransactionStatus.Succeeded) return <Iconify icon="eva:checkmark-fill" />;
    if (status === TransactionStatus.Failed) return <Iconify icon="eva:close-fill" />;
    if (status === TransactionStatus.Pending) return <Iconify icon="eva:clock-fill" />;
    if (status === TransactionStatus.Processing) return <Iconify icon="eva:clock-fill" />;
    if (status === TransactionStatus.Canceled) return <Iconify icon="eva:close-fill" />;

    return <Iconify icon="eva:question-mark-fill" />;
  };

  return (
    <Chip
      size="small"
      variant="outlined"
      label={getLabel()}
      color={getColor()}
      icon={getIcon()}
      sx={{
        width: 100,
      }}
      {...other}
    />
  );
}
