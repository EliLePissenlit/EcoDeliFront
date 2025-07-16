import { useSnackbar } from 'notistack';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';

import type { PaymentMethod } from 'src/types/graphql/typeDefs';
import {
  GetUserPaymentMethodsDocument,
  useDeletePaymentMethodMutation,
} from 'src/types/graphql/typeDefs';

type Props = {
  card: PaymentMethod;
  sx?: any;
};

export function PaymentMethodItem({ card, sx }: Props) {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();

  const [deletePaymentMethod] = useDeletePaymentMethodMutation({
    refetchQueries: [{ query: GetUserPaymentMethodsDocument }],
    onCompleted: () => {
      enqueueSnackbar(t('profile.transactions.payment_methods.delete_success'), {
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar(t('profile.transactions.payment_methods.delete_error'), {
        variant: 'error',
      });
    },
  });

  const handleDelete = async () => {
    try {
      await deletePaymentMethod({
        variables: {
          paymentMethodId: card.id,
        },
      });
    } catch (error) {
      console.error('Error deleting payment method:', error);
    }
  };

  return (
    <Card
      sx={{
        p: 3,
        height: 200,
        width: '100%',
        maxWidth: 400,
        margin: '0 auto',
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.dark} 100%)`,
        color: 'common.white',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h100v100H0z" fill="%23ffffff" fill-opacity="0.1"/%3E%3C/svg%3E")',
          opacity: 0.2,
        },
        ...sx,
      }}
    >
      <Stack spacing={2} height="100%" justifyContent="space-between">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Iconify icon={getCardIcon(card.brand)} width={48} sx={{ color: 'common.white' }} />
          {card.isDefault && (
            <Typography variant="caption" sx={{ color: 'common.white', opacity: 0.72 }}>
              {t('common.default')}
            </Typography>
          )}
        </Stack>

        <Typography variant="h6" sx={{ letterSpacing: 2, textAlign: 'center' }}>
          •••• •••• •••• {card.last4}
        </Typography>

        <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
          <Stack spacing={0.5}>
            <Typography variant="caption" sx={{ color: 'common.white', opacity: 0.72 }}>
              {t('common.card.expiry')}
            </Typography>
            <Typography variant="body2">
              {card.expiryMonth.toString().padStart(2, '0')}/{card.expiryYear}
            </Typography>
          </Stack>

          <IconButton
            onClick={handleDelete}
            size="small"
            sx={{
              color: 'error.main',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              padding: 1,
            }}
          >
            <Iconify icon="mdi:delete" width={20} />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
}

function getCardIcon(brand: string) {
  switch (brand.toLowerCase()) {
    case 'visa':
      return 'logos:visa';
    case 'mastercard':
      return 'logos:mastercard';
    case 'american express':
      return 'logos:amex';
    default:
      return 'solar:card-bold';
  }
}
