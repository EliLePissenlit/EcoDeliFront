import { useState } from 'react';

import Box from '@mui/material/Box';
import { Fab } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';

import { useGetActiveSubscriptionsQuery } from 'src/types/graphql/typeDefs';

import SubscriptionCard from './subscription-card';

export default function SubscriptionsCarousel() {
  const { t } = useTranslate();
  const { data } = useGetActiveSubscriptionsQuery();
  const [currentIndex, setCurrentIndex] = useState(0);

  const subscriptions = data?.getActiveSubscriptions || [];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % subscriptions.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + subscriptions.length) % subscriptions.length);
  };

  if (!subscriptions.length) {
    return (
      <Card variant="blur">
        <Typography variant="h4" sx={{ px: 3, pt: 3, mb: 2 }}>
          {t('profile.transactions.subscriptions.title')}
        </Typography>
        <Typography variant="body2" sx={{ px: 3, mb: 3, color: 'text.secondary' }}>
          {t('profile.transactions.subscriptions.description')}
        </Typography>
        <EmptyContent
          title={t('profile.transactions.no_data.title')}
          description={t('profile.transactions.no_data.description')}
        />
      </Card>
    );
  }

  return (
    <Card variant="blur">
      <Typography variant="h4" sx={{ px: 3, pt: 3, mb: 2 }}>
        {t('profile.transactions.subscriptions.title')}
      </Typography>
      <Typography variant="body2" sx={{ px: 3, mb: 2, color: 'text.secondary' }}>
        {t('profile.transactions.subscriptions.description')}
      </Typography>

      <Box sx={{ position: 'relative', minHeight: 300 }}>
        <Box sx={{ width: '100%', px: 3 }}>
          <SubscriptionCard subscription={subscriptions[currentIndex]} />
        </Box>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: 20,
          }}
        >
          <Fab
            name="subscriptions-carousel-prev-button"
            aria-label="subscriptions-carousel-prev-button"
            color="primary"
            size="small"
            onClick={handlePrev}
            disabled={subscriptions.length <= 1}
          >
            <Iconify icon="eva:arrow-ios-back-fill" />
          </Fab>

          <Fab
            name="subscriptions-carousel-next-button"
            aria-label="subscriptions-carousel-next-button"
            color="primary"
            size="small"
            onClick={handleNext}
            disabled={subscriptions.length <= 1}
          >
            <Iconify icon="eva:arrow-ios-forward-fill" />
          </Fab>
        </Stack>
      </Box>
    </Card>
  );
}
