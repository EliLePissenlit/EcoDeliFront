import React from 'react';

import Box from '@mui/material/Box';
import { Fab } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';

import { useGetUserPaymentMethodsQuery } from 'src/types/graphql/typeDefs';

import { PaymentMethodItem } from './payment-method-item';

export default function PaymentMethodsCarousel() {
  const { t } = useTranslate();
  const { data, loading } = useGetUserPaymentMethodsQuery();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const paymentMethods = data?.getUserPaymentMethods || [];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % paymentMethods.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + paymentMethods.length) % paymentMethods.length);
  };

  if (loading) {
    return null;
  }

  if (!paymentMethods.length) {
    return (
      <Card sx={{ p: 3, mb: 3 }} variant="blur">
        <Typography variant="h4" sx={{ mb: 2 }}>
          {t('profile.transactions.payment_methods.title')}
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
          {t('profile.transactions.payment_methods.description')}
        </Typography>
        <EmptyContent title={t('profile.transactions.payment_methods.no_data')} sx={{ py: 3 }} />
      </Card>
    );
  }

  return (
    <Card sx={{ p: 3, mb: 3 }} variant="blur">
      <Typography variant="h4" sx={{ mb: 2 }}>
        {t('profile.transactions.payment_methods.title')}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
        {t('profile.transactions.payment_methods.description')}
      </Typography>

      <Box sx={{ position: 'relative', minHeight: 300 }}>
        <Box sx={{ width: '100%', px: 1 }}>
          <PaymentMethodItem card={paymentMethods[currentIndex]} />
        </Box>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            position: 'absolute',
            bottom: -20,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <Fab
            color="primary"
            size="small"
            onClick={handlePrev}
            disabled={paymentMethods.length <= 1}
          >
            <Iconify icon="eva:arrow-ios-back-fill" />
          </Fab>

          <Fab
            color="primary"
            size="small"
            onClick={handleNext}
            disabled={paymentMethods.length <= 1}
          >
            <Iconify icon="eva:arrow-ios-forward-fill" />
          </Fab>
        </Stack>
      </Box>
    </Card>
  );
}
