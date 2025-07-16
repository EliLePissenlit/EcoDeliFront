import React from 'react';

import {
  Stack,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
} from '@mui/material';

import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

type SortOption = {
  value: string;
  label: string;
  direction: 'asc' | 'desc';
};

type TaskSortProps = {
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  onSortChange: (sortBy: string, direction: 'asc' | 'desc') => void;
};

export default function TaskSort({ sortBy, sortDirection, onSortChange }: TaskSortProps) {
  const { t } = useTranslate();

  const sortOptions: SortOption[] = [
    { value: 'createdAt', label: t('tasks.list.sort.created_at'), direction: 'desc' },
    { value: 'updatedAt', label: t('tasks.list.sort.updated_at'), direction: 'desc' },
    { value: 'price', label: t('tasks.list.sort.price'), direction: 'asc' },
    { value: 'title', label: t('tasks.list.sort.title_label'), direction: 'asc' },
    { value: 'status', label: t('tasks.list.sort.status'), direction: 'asc' },
  ];

  const handleSortChange = (event: any) => {
    const { value } = event.target;
    const option = sortOptions.find((opt) => opt.value === value);
    if (option) {
      onSortChange(value, option.direction);
    }
  };

  const toggleDirection = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    onSortChange(sortBy, newDirection);
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography variant="body2" color="text.secondary">
        {t('tasks.list.sort.title')}
      </Typography>

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>{t('tasks.list.sort.title')}</InputLabel>
        <Select value={sortBy} label={t('tasks.list.sort.title')} onChange={handleSortChange}>
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        size="small"
        variant="outlined"
        onClick={toggleDirection}
        sx={{ minWidth: 'auto', px: 1 }}
      >
        {sortDirection === 'asc' ? '↑' : '↓'}
      </Button>
    </Stack>
  );
}
