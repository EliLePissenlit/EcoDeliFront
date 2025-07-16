import React from 'react';
import { format } from 'date-fns';

import { Box, Stack, TableRow, Checkbox, TableCell, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';

import RowMoreMenu from './row-more-menu';

// ----------------------------------------------------------------------

type Category = {
  id: string;
  name: string;
  description?: string | null;
  amountInCents?: number | null;
  color?: string | null;
  fileUrl?: string | null;
  createdAt: string;
  updatedAt: string;
};

type CategoryRowProps = {
  category: Category;
  isSelected: boolean;
  onSelectCategory: (categoryId: string) => void;
  onEditCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
};

export default function CategoryRow({
  category,
  isSelected,
  onSelectCategory,
  onEditCategory,
  onDeleteCategory,
}: CategoryRowProps) {
  const { t } = useTranslate();

  return (
    <TableRow key={category.id}>
      <TableCell padding="checkbox">
        <Checkbox checked={isSelected} onChange={() => onSelectCategory(category.id)} />
      </TableCell>
      <TableCell>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1,
              backgroundColor: category.color || 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {category.fileUrl ? (
              <Box
                component="img"
                src={category.fileUrl}
                alt={category.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Typography variant="caption" color="white">
                {category.name.charAt(0).toUpperCase()}
              </Typography>
            )}
          </Box>
          <Typography>{category.name}</Typography>
        </Stack>
        {category.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {category.description}
          </Typography>
        )}
      </TableCell>
      <TableCell>
        {category.amountInCents !== null && category.amountInCents !== undefined ? (
          <Typography variant="body2">{(category.amountInCents / 100).toFixed(2)} €</Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            -
          </Typography>
        )}
      </TableCell>
      <TableCell>
        {category.color && (
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: 1,
              backgroundColor: category.color,
              border: '1px solid',
              borderColor: 'divider',
            }}
          />
        )}
      </TableCell>
      <TableCell>
        <Stack spacing={0.5}>
          <Typography variant="body2" color="text.secondary">
            {t('sections.categoriesAdministration.table.created')}:{' '}
            {format(new Date(category.createdAt), 'PPp')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('sections.categoriesAdministration.table.updated')}:{' '}
            {format(new Date(category.updatedAt), 'PPp')}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align="right">
        <RowMoreMenu
          category={category}
          onEditCategory={onEditCategory}
          onDeleteCategory={onDeleteCategory}
        />
      </TableCell>
    </TableRow>
  );
}
