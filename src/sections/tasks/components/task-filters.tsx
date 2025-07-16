import React, { useState } from 'react';

import {
  Box,
  Card,
  Grid,
  Stack,
  Button,
  Select,
  Slider,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  Autocomplete,
} from '@mui/material';

import { useTranslate } from 'src/locales';

import { TaskType, TaskStatus } from 'src/types/graphql/typeDefs';

// ----------------------------------------------------------------------

type Category = {
  id: string;
  name: string;
  color: string;
};

type TaskFiltersProps = {
  categories: Category[];
  filters: {
    status?: TaskStatus;
    categoryId?: string;
    type?: TaskType;
    priceMin?: number;
    priceMax?: number;
    radius?: number;
  };
  onFiltersChange: (filters: any) => void;
  onReset: () => void;
};

export default function TaskFilters({
  categories,
  filters,
  onFiltersChange,
  onReset,
}: TaskFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters);
  const { t } = useTranslate();

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    setLocalFilters({});
    onReset();
  };

  return (
    <Card sx={{ p: 4 }}>
      <Stack spacing={3}>
        {/* En-tête */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{t('tasks.list.filters.title')}</Typography>
          <Button size="small" onClick={handleReset} color="inherit">
            {t('tasks.list.filters.reset')}
          </Button>
        </Stack>

        <Grid container spacing={2} alignItems="center">
          {/* Statut */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel>{t('tasks.list.filters.status')}</InputLabel>
              <Select
                value={localFilters.status || ''}
                label={t('tasks.list.filters.status')}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <MenuItem value="">{t('tasks.list.filters.all_statuses')}</MenuItem>
                <MenuItem value={TaskStatus.Draft}>{t('tasks.status.draft')}</MenuItem>
                <MenuItem value={TaskStatus.Published}>{t('tasks.status.published')}</MenuItem>
                <MenuItem value={TaskStatus.InProgress}>{t('tasks.status.in_progress')}</MenuItem>
                <MenuItem value={TaskStatus.Completed}>{t('tasks.status.completed')}</MenuItem>
                <MenuItem value={TaskStatus.Done}>{t('tasks.status.done')}</MenuItem>
                <MenuItem value={TaskStatus.Cancelled}>{t('tasks.status.cancelled')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Type de tâche */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel>{t('tasks.list.filters.type')}</InputLabel>
              <Select
                value={localFilters.type || ''}
                label={t('tasks.list.filters.type')}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <MenuItem value="">{t('tasks.list.filters.all_types')}</MenuItem>
                <MenuItem value={TaskType.Service}>{t('tasks.form.basic_info.service')}</MenuItem>
                <MenuItem value={TaskType.Shipping}>{t('tasks.form.basic_info.shipping')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Catégorie */}
          <Grid item xs={12} md={6}>
            <Autocomplete
              options={categories}
              getOptionLabel={(option) => option.name}
              value={categories.find((cat) => cat.id === localFilters.categoryId) || null}
              onChange={(_, newValue) => handleFilterChange('categoryId', newValue?.id || '')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('tasks.list.filters.category')}
                  size="small"
                  placeholder={t('tasks.list.filters.category_placeholder')}
                />
              )}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: option.color,
                      }}
                    />
                    {option.name}
                  </Stack>
                </Box>
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id}
            />
          </Grid>

          {/* Prix */}
          <Grid item xs={12} md={6}>
            <Box>
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  size="small"
                  type="number"
                  placeholder={t('tasks.list.filters.price_min')}
                  value={localFilters.priceMin || ''}
                  onChange={(e) => handleFilterChange('priceMin', Number(e.target.value))}
                  sx={{ width: '50%' }}
                />
                <Typography variant="body2" color="text.secondary">
                  -
                </Typography>
                <TextField
                  size="small"
                  type="number"
                  placeholder={t('tasks.list.filters.price_max')}
                  value={localFilters.priceMax || ''}
                  onChange={(e) => handleFilterChange('priceMax', Number(e.target.value))}
                  sx={{ width: '50%' }}
                />
              </Stack>
            </Box>
          </Grid>

          {/* Rayon de recherche */}
          <Grid item xs={12} md={12}>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {t('tasks.list.filters.radius')}: {localFilters.radius || 10}{' '}
                {t('tasks.list.filters.km')}
              </Typography>
              <Slider
                value={localFilters.radius || 10}
                onChange={(_, value) => handleFilterChange('radius', value)}
                min={1}
                max={50}
                step={1}
                marks={[
                  { value: 1, label: t('tasks.list.filters.1km') },
                  { value: 25, label: t('tasks.list.filters.25km') },
                  { value: 50, label: t('tasks.list.filters.50km') },
                ]}
                valueLabelDisplay="auto"
              />
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
}
