/* eslint-disable no-nested-ternary */
import React from 'react';

import { Box, Card, Chip, Stack, Avatar, Divider, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';

import { TaskType, PackageCategory } from 'src/types/graphql/typeDefs';

interface TaskSummaryProps {
  formData: any;
  categories: any[];
}

export default function TaskSummary({ formData, categories }: TaskSummaryProps) {
  const { t } = useTranslate();

  // Trouver la catégorie sélectionnée
  const selectedCategory = categories.find((cat) => cat.id === formData.categoryId);

  // Vérifier si une image a été sélectionnée
  const hasImage =
    formData.file && (formData.file instanceof File || typeof formData.file === 'string');

  // Formater la durée estimée
  const formatDuration = (hours: number) => `${hours} ${t('tasks.detail.hours')}`;

  // Formater les dimensions du colis
  const formatDimensions = (length: number, width: number, height: number) => {
    if (length === 0 && width === 0 && height === 0) {
      return t('common.not_specified');
    }
    return `${length} × ${width} × ${height} cm`;
  };

  return (
    <Card sx={{ p: 3, position: 'sticky', top: 24 }}>
      <Stack spacing={3}>
        {/* En-tête */}
        <Box>
          <Typography variant="h6" gutterBottom>
            {t('tasks.summary.title')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('tasks.summary.subtitle')}
          </Typography>
        </Box>

        <Divider />

        {/* Informations de base */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {t('tasks.summary.basic_info')}
          </Typography>

          <Stack spacing={2}>
            {/* Titre */}
            <Box>
              <Typography variant="body2" color="text.secondary">
                {t('tasks.form.basic_info.title_label')}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {formData.title || t('common.not_specified')}
              </Typography>
            </Box>

            {/* Type de tâche */}
            <Box>
              <Typography variant="body2" color="text.secondary">
                {t('tasks.form.basic_info.task_type_label')}
              </Typography>
              <Chip
                label={
                  formData.type === TaskType.Service
                    ? t('tasks.form.basic_info.service')
                    : t('tasks.form.basic_info.shipping')
                }
                color={formData.type === TaskType.Service ? 'primary' : 'secondary'}
                size="small"
              />
            </Box>

            {/* Image */}
            <Box>
              <Typography variant="body2" color="text.secondary">
                {t('tasks.form.basic_info.image_label')}
              </Typography>
              {hasImage ? (
                <Chip
                  icon={<Avatar sx={{ width: 16, height: 16 }}>📷</Avatar>}
                  label={t('common.image_selected')}
                  color="success"
                  size="small"
                />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {t('common.not_specified')}
                </Typography>
              )}
            </Box>
          </Stack>
        </Box>

        <Divider />

        {/* Détails selon le type de tâche */}
        {formData.type === TaskType.Service ? (
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {t('tasks.summary.service_details')}
            </Typography>

            <Stack spacing={2}>
              {/* Catégorie */}
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {t('tasks.form.service.category_label')}
                </Typography>
                {selectedCategory ? (
                  <Chip
                    label={selectedCategory.name}
                    sx={{
                      backgroundColor: selectedCategory.color,
                      color: 'white',
                      '& .MuiChip-label': { color: 'white' },
                    }}
                    size="small"
                  />
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    {t('common.not_specified')}
                  </Typography>
                )}
              </Box>

              {/* Durée estimée */}
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {t('tasks.form.service.duration_label')}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {(formData.estimatedDuration || 0) > 0
                    ? formatDuration(formData.estimatedDuration)
                    : t('common.not_specified')}
                </Typography>
              </Box>
            </Stack>
          </Box>
        ) : (
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {t('tasks.summary.shipping_details')}
            </Typography>

            <Stack spacing={2}>
              {/* Catégorie de colis */}
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {t('tasks.form.shipping.package_category_label')}
                </Typography>
                <Chip
                  label={
                    formData.packageCategory === PackageCategory.Small
                      ? t('tasks.form.shipping.small')
                      : formData.packageCategory === PackageCategory.Medium
                        ? t('tasks.form.shipping.medium')
                        : formData.packageCategory === PackageCategory.Large
                          ? t('tasks.form.shipping.large')
                          : t('common.not_specified')
                  }
                  color="secondary"
                  size="small"
                />
              </Box>

              {/* Poids */}
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {t('tasks.form.shipping.weight_label')}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {formData.packageDetails?.weight > 0
                    ? `${formData.packageDetails.weight} kg`
                    : t('common.not_specified')}
                </Typography>
              </Box>

              {/* Dimensions */}
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {t('tasks.summary.dimensions')}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {formatDimensions(
                    formData.packageDetails?.length || 0,
                    formData.packageDetails?.width || 0,
                    formData.packageDetails?.height || 0
                  )}
                </Typography>
              </Box>
            </Stack>
          </Box>
        )}

        <Divider />

        {/* Adresses */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {t('tasks.summary.addresses')}
          </Typography>

          <Stack spacing={2}>
            {formData.type === TaskType.Service ? (
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {t('tasks.form.address.service_address_label')}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {formData.address?.fullAddress || t('common.not_specified')}
                </Typography>
              </Box>
            ) : (
              <>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t('tasks.form.address.pickup_address_label')}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formData.pickupAddress?.fullAddress || t('common.not_specified')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t('tasks.form.address.delivery_address_label')}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formData.deliveryAddress?.fullAddress || t('common.relay_point')}
                  </Typography>
                </Box>
              </>
            )}
          </Stack>
        </Box>

        {/* Description (aperçu) */}
        {formData.description && (
          <>
            <Divider />
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {t('tasks.summary.description_preview')}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  maxHeight: 100,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {formData.description.replace(/<[^>]*>/g, '')}
              </Typography>
            </Box>
          </>
        )}
      </Stack>
    </Card>
  );
}
