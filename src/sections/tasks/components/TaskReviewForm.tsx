import React, { useState, useEffect } from 'react';

import { Box, Chip, Stack, Paper, Alert, Typography, CircularProgress } from '@mui/material';

import { useTranslate } from 'src/locales';

import { TaskType, useCalculatePriceRangeFromGeoDataLazyQuery } from 'src/types/graphql/typeDefs';

interface TaskReviewFormProps {
  formData: any;
  categories: any[];
  onSubmit: () => void;
  loading: boolean;
}

export default function TaskReviewForm({
  formData,
  categories,
  onSubmit,
  loading,
}: TaskReviewFormProps) {
  const { t } = useTranslate();
  const [priceEstimate, setPriceEstimate] = useState<any>(null);
  const [priceLoading, setPriceLoading] = useState(false);

  const [calculatePrice] = useCalculatePriceRangeFromGeoDataLazyQuery();

  const selectedCategory = categories.find((cat) => cat.id === formData.categoryId);

  const formatAddress = (address: any) => {
    if (!address?.fullAddress) return t('common.relay_point');
    return address.fullAddress;
  };

  const formatPrice = (cents: number) =>
    new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(cents / 100);

  const formatDistance = (meters: number) => {
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    }
    return `${(meters / 1000).toFixed(1)}km`;
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${Math.round(minutes)}min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);
    return remainingMinutes > 0 ? `${hours}h${remainingMinutes}min` : `${hours}h`;
  };

  // Calculer l'estimation du prix quand les adresses sont disponibles
  useEffect(() => {
    const calculatePriceEstimate = async () => {
      if (
        formData.type === TaskType.Shipping &&
        formData.pickupAddress?.lat &&
        formData.pickupAddress?.lng &&
        formData.relayPointId
      ) {
        setPriceLoading(true);
        try {
          const { data } = await calculatePrice({
            variables: {
              input: {
                start: {
                  lat: formData.pickupAddress.lat,
                  lon: formData.pickupAddress.lng,
                },
                relayPointId: formData.relayPointId,
                packageCategory: formData.packageCategory,
              },
            },
          });

          if (data?.calculatePriceRangeFromGeoData) {
            setPriceEstimate(data.calculatePriceRangeFromGeoData);
          }
        } catch (error) {
          console.error('Erreur lors du calcul du prix:', error);
        } finally {
          setPriceLoading(false);
        }
      }
    };

    calculatePriceEstimate();
  }, [formData, calculatePrice]);

  return (
    <Stack spacing={3}>
      <Typography variant="h6">{t('tasks.form.review.title')}</Typography>
      <Typography variant="body2" color="text.secondary">
        {t('tasks.form.review.description')}
      </Typography>

      {/* Informations de base */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          {t('tasks.form.review.basic_info')}
        </Typography>
        <Stack spacing={1}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {t('common.title')}:
            </Typography>
            <Typography variant="body1">{formData.title}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {t('common.description')}:
            </Typography>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: formData.description }}
            />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {t('tasks.form.basic_info.task_type_label')}:
            </Typography>
            <Chip
              label={
                formData.type === TaskType.Service
                  ? t('tasks.form.basic_info.service')
                  : t('tasks.form.basic_info.shipping')
              }
              color="primary"
              size="small"
            />
          </Box>
          {formData.file && (
            <Box>
              <Typography variant="body2" color="text.secondary">
                {t('tasks.form.basic_info.image_label')}:
              </Typography>
              <Typography variant="body1">{t('common.image_selected')}</Typography>
            </Box>
          )}
        </Stack>
      </Paper>

      {/* Détails selon le type */}
      {formData.type === TaskType.Service ? (
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            {t('tasks.form.review.task_type')}
          </Typography>
          <Stack spacing={1}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {t('common.category')}:
              </Typography>
              <Typography variant="body1">
                {selectedCategory?.name || t('common.not_specified')}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {t('tasks.form.service.duration_label')}:
              </Typography>
              <Typography variant="body1">
                {formData.estimatedDuration} {t('tasks.detail.hours')}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      ) : (
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            {t('tasks.form.review.task_type')}
          </Typography>
          <Stack spacing={1}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {t('tasks.form.shipping.package_category_label')}:
              </Typography>
              <Typography variant="body1">{formData.packageCategory}</Typography>
            </Box>
            {formData.packageDetails?.weight && (
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {t('tasks.form.shipping.weight_label')}:
                </Typography>
                <Typography variant="body1">{formData.packageDetails.weight} kg</Typography>
              </Box>
            )}
          </Stack>
        </Paper>
      )}

      {/* Adresse */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          {t('tasks.form.review.address')}
        </Typography>
        {formData.type === TaskType.Service ? (
          <Box>
            <Typography variant="body2" color="text.secondary">
              {t('tasks.form.address.service_address_label')}:
            </Typography>
            <Typography variant="body1">{formatAddress(formData.address)}</Typography>
          </Box>
        ) : (
          <Stack spacing={2}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {t('tasks.form.address.pickup_address_label')}:
              </Typography>
              <Typography variant="body1">{formatAddress(formData.pickupAddress)}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {t('tasks.form.address.delivery_address_label')}:
              </Typography>
              <Typography variant="body1">{formatAddress(formData.deliveryAddress)}</Typography>
            </Box>
          </Stack>
        )}
      </Paper>

      {/* Estimation du prix (pour les livraisons) */}
      {formData.type === TaskType.Shipping && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            {t('tasks.form.review.price_estimation')}
          </Typography>
          {(() => {
            if (priceLoading) {
              return (
                <Box display="flex" alignItems="center" gap={1}>
                  <CircularProgress size={20} />
                  <Typography variant="body2">
                    {t('tasks.form.review.calculating_price')}
                  </Typography>
                </Box>
              );
            }
            if (priceEstimate) {
              return (
                <Stack spacing={1}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {t('tasks.form.review.price_range')}:
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {formatPrice(priceEstimate.minPriceInCents)} -{' '}
                      {formatPrice(priceEstimate.maxPriceInCents)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {t('tasks.form.review.estimated_distance')}:
                    </Typography>
                    <Typography variant="body1">
                      {formatDistance(priceEstimate.estimatedDistanceInMeters)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {t('tasks.form.review.estimated_duration')}:
                    </Typography>
                    <Typography variant="body1">
                      {formatDuration(priceEstimate.estimatedDurationInMinutes)}
                    </Typography>
                  </Box>
                </Stack>
              );
            }
            return <Alert severity="info">{t('tasks.form.review.price_not_available')}</Alert>;
          })()}
        </Paper>
      )}
    </Stack>
  );
}
