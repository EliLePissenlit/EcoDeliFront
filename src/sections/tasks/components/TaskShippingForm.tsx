import React from 'react';

import { Stack, MenuItem, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';

import { RHFSelect } from 'src/components/hook-form/rhf-select';
import RHFTextField from 'src/components/hook-form/rhf-text-field';

import { PackageCategory } from 'src/types/graphql/typeDefs';

interface TaskShippingFormProps {
  formData: any;
  categories: any[];
  isValid: boolean;
}

export default function TaskShippingForm({ formData, categories, isValid }: TaskShippingFormProps) {
  const { t } = useTranslate();

  return (
    <Stack spacing={3}>
      <Typography variant="h6">{t('tasks.form.shipping.title')}</Typography>

      <RHFSelect
        name="categoryId"
        label={t('tasks.form.service.category_label')}
        helperText={t('tasks.form.shipping.category_helper')}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </RHFSelect>

      <RHFSelect
        name="packageCategory"
        label={t('tasks.form.shipping.package_category_label')}
        required
      >
        <MenuItem value={PackageCategory.Small}>{t('tasks.form.shipping.small')}</MenuItem>
        <MenuItem value={PackageCategory.Medium}>{t('tasks.form.shipping.medium')}</MenuItem>
        <MenuItem value={PackageCategory.Large}>{t('tasks.form.shipping.large')}</MenuItem>
      </RHFSelect>

      <Typography variant="subtitle1">{t('tasks.form.shipping.package_details_label')}</Typography>

      <RHFTextField
        name="packageDetails.weight"
        type="number"
        label={t('tasks.form.shipping.weight_label')}
        inputProps={{ min: 0, step: 0.1 }}
      />

      <Stack direction="row" spacing={2}>
        <RHFTextField
          name="packageDetails.length"
          type="number"
          label={t('tasks.form.shipping.length')}
          inputProps={{ min: 0, step: 0.1 }}
        />
        <RHFTextField
          name="packageDetails.width"
          type="number"
          label={t('tasks.form.shipping.width')}
          inputProps={{ min: 0, step: 0.1 }}
        />
        <RHFTextField
          name="packageDetails.height"
          type="number"
          label={t('tasks.form.shipping.height')}
          inputProps={{ min: 0, step: 0.1 }}
        />
      </Stack>
    </Stack>
  );
}
