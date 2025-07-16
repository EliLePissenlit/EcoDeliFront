import React from 'react';

import {
  Stack,
  Button,
  Select,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
} from '@mui/material';

// ----------------------------------------------------------------------

type TaskPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
};

export default function TaskPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: TaskPaginationProps) {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i += 1) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 4; i += 1) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 3; i <= totalPages; i += 1) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i += 1) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ p: 3, borderTop: 1, borderColor: 'divider', width: '100%' }}
    >
      {/* Informations sur les éléments affichés */}
      <Typography variant="body2" color="text.secondary">
        Affichage de {startItem} à {endItem} sur {totalItems} tâches
      </Typography>

      {/* Contrôles de pagination */}
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Éléments par page */}
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Par page</InputLabel>
          <Select
            value={itemsPerPage}
            label="Par page"
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>

        {/* Boutons de navigation */}
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Précédent
          </Button>

          {/* Numéros de page */}
          {getPageNumbers().map((page, index) => (
            <Button
              key={index}
              size="small"
              variant={page === currentPage ? 'gradient' : 'outlined'}
              onClick={() => typeof page === 'number' && handlePageClick(page)}
              disabled={page === '...'}
              sx={{ minWidth: 40 }}
            >
              {page}
            </Button>
          ))}

          <Button
            size="small"
            variant="outlined"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Suivant
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
