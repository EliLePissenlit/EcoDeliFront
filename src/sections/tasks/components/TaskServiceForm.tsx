import React from 'react';
import { useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import RHFTextField from 'src/components/hook-form/rhf-text-field';

interface TaskServiceFormProps {
  formData: any;
  categories: any[];
  isValid: boolean;
}

export default function TaskServiceForm({ formData, categories, isValid }: TaskServiceFormProps) {
  const { t } = useTranslate();
  const { setValue, watch } = useFormContext();
  const selectedCategoryId = watch('categoryId');
  const [carouselIndex, setCarouselIndex] = React.useState(0);
  const visibleCount = 4;
  const canScrollLeft = carouselIndex > 0;
  const canScrollRight = carouselIndex + visibleCount < categories.length;

  // Gestion de la sélection de catégorie
  const handleSelectCategory = (categoryId: string) => {
    setValue('categoryId', categoryId, { shouldValidate: true, shouldDirty: true });
  };
  const handlePrev = () => {
    if (canScrollLeft) setCarouselIndex(carouselIndex - 1);
  };
  const handleNext = () => {
    if (canScrollRight) setCarouselIndex(carouselIndex + 1);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6">{t('tasks.form.service.title')}</Typography>

      {/* Carousel de catégories */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton onClick={handlePrev} disabled={!canScrollLeft} size="small">
          <Iconify icon="mdi:chevron-left" width={24} />
        </IconButton>
        <Stack direction="row" spacing={2} flexWrap="nowrap">
          {categories.slice(carouselIndex, carouselIndex + visibleCount).map((category) => (
            <Button
              key={category.id}
              onClick={() => handleSelectCategory(category.id)}
              variant={selectedCategoryId === category.id ? 'contained' : 'outlined'}
              sx={{
                minWidth: 140,
                borderRadius: 2,
                borderColor: category.color,
                bgcolor: selectedCategoryId === category.id ? category.color : 'background.paper',
                color: selectedCategoryId === category.id ? 'white' : 'text.primary',
                boxShadow: selectedCategoryId === category.id ? 4 : 1,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                borderWidth: 2,
                borderStyle: 'solid',
                transition: 'all 0.2s',
              }}
            >
              {category.fileUrl && (
                <Box
                  component="img"
                  src={category.fileUrl}
                  alt={category.name}
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1,
                    mb: 1,
                    objectFit: 'cover',
                    background: '#f5f5f5',
                  }}
                />
              )}
              <Typography variant="subtitle2" noWrap>
                {category.name}
              </Typography>
            </Button>
          ))}
        </Stack>
        <IconButton onClick={handleNext} disabled={!canScrollRight} size="small">
          <Iconify icon="mdi:chevron-right" width={24} />
        </IconButton>
      </Stack>

      <RHFTextField
        name="estimatedDuration"
        type="number"
        label={t('tasks.form.service.duration_label')}
        placeholder={t('tasks.form.service.duration_placeholder')}
        required
        inputProps={{ min: 1 }}
      />
    </Stack>
  );
}
