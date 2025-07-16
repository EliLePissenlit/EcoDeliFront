import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import FormErrors from 'src/components/hook-form/form-errors';

type PaymentFormProps = {
  onSuccess?: () => void;
  returnUrl: string;
  buttonText: string;
};

function PaymentForm({ onSuccess, returnUrl, buttonText }: PaymentFormProps) {
  const { t } = useTranslate();
  const stripe = useStripe();
  const elements = useElements();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      const { error: stripeError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
        },
        redirect: 'if_required',
      });

      if (stripeError) {
        setError(stripeError);
        enqueueSnackbar(t('payment.error'), { variant: 'error' });
      } else {
        enqueueSnackbar(t('payment.success'), { variant: 'success' });
        onSuccess?.();
      }
    } catch (err) {
      setError(err);
      enqueueSnackbar(t('payment.error'), { variant: 'error' });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3} sx={{ width: '100%' }}>
        <PaymentElement
          options={{
            layout: 'tabs',
            paymentMethodOrder: ['card'],
            fields: {
              billingDetails: {
                name: 'auto',
                email: 'auto',
              },
            },
          }}
        />

        <FormErrors
          error={error}
          expectedErrors={[
            { code: 'card_error', message: t('payment.card_error') },
            { code: 'validation_error', message: t('payment.validation_error') },
            { code: 'INVALID_COUPON_CODE', message: t('payment.invalid_coupon') },
            {
              code: 'FAILED_TO_CREATE_PAYMENT_INTENT',
              message: t('payment.failed_to_create_payment_intent'),
            },
          ]}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="gradient"
          loading={loading}
          disabled={!stripe}
        >
          {buttonText}
        </LoadingButton>
      </Stack>
    </form>
  );
}

type GenericStripePaymentProps = {
  open?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  clientSecret: string;
  stripePromise: any;
  returnUrl: string;
  buttonText: string;
  isDialog?: boolean;
  title?: string;
};

export default function GenericStripePayment({
  open = false,
  onClose,
  onSuccess,
  clientSecret,
  stripePromise,
  returnUrl,
  buttonText,
  isDialog = false,
  title,
}: GenericStripePaymentProps) {
  const { t } = useTranslate();

  const content = (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#0570de',
            colorBackground: '#ffffff',
            colorText: '#30313d',
          },
        },
        loader: 'auto',
      }}
    >
      <PaymentForm onSuccess={onSuccess} returnUrl={returnUrl} buttonText={buttonText} />
    </Elements>
  );

  if (!isDialog) {
    return content;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          bgcolor: 'background.paper',
          borderRadius: 2,
          p: 1,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 2,
        }}
      >
        {title || t('payment.title')}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Iconify icon="eva:close-fill" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 1 }}>{content}</DialogContent>
    </Dialog>
  );
}
