import { useNavigate } from 'react-router-dom';
import React, { useMemo, useState } from 'react';

import { Box, Grid, Stack, Alert, Container, CircularProgress } from '@mui/material';

import { useTranslate } from 'src/locales';

import StyledPage from 'src/components/styled-page';

import { TaskCard, TaskSort, TaskFilters, TaskPagination } from 'src/sections/tasks/components';

import { useListTasksQuery, useGetCategoriesQuery } from 'src/types/graphql/typeDefs';

export default function TasksListPage() {
  const { t } = useTranslate();
  const navigate = useNavigate();

  // Filtres, tri, pagination (état local)
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Récupération des catégories pour les filtres
  const { data: categoriesData, loading: loadingCategories } = useGetCategoriesQuery();
  const categories = useMemo(
    () =>
      (categoriesData?.getCategories || []).map((cat) => ({
        ...cat,
        color: cat.color || '#BDBDBD', // gris par défaut si couleur absente
      })),
    [categoriesData]
  );

  // Récupération des tâches (filtrées côté serveur)
  const { data, loading, error, refetch } = useListTasksQuery({
    variables: {
      filters: {
        ...filters,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  // Pagination côté client (à adapter si backend supporte la pagination)
  const allTasks = useMemo(() => data?.listTasks || [], [data]);
  const sortedTasks = useMemo(
    () =>
      [...allTasks].sort((a: any, b: any) => {
        if (sortBy === 'price') {
          return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
        }
        if (sortBy === 'title') {
          return sortDirection === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        }
        if (sortBy === 'status') {
          return sortDirection === 'asc'
            ? a.status.localeCompare(b.status)
            : b.status.localeCompare(a.status);
        }
        // Par défaut, tri par date
        const dateA = new Date(a[sortBy]);
        const dateB = new Date(b[sortBy]);
        return sortDirection === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }),
    [allTasks, sortBy, sortDirection]
  );

  const totalItems = sortedTasks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedTasks = sortedTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1);
    refetch();
  };
  const handleSortChange = (newSortBy: string, newDirection: 'asc' | 'desc') => {
    setSortBy(newSortBy);
    setSortDirection(newDirection);
  };
  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleItemsPerPageChange = (n: number) => {
    setItemsPerPage(n);
    setCurrentPage(1);
  };
  const handleResetFilters = () => {
    setFilters({});
    setCurrentPage(1);
    refetch();
  };

  // Handlers pour les actions des TaskCard
  const handleViewDetails = (taskId: string) => {
    navigate(`/tasks/${taskId}`);
  };

  let content;
  if (loading || loadingCategories) {
    content = (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
        <CircularProgress size={60} />
      </Box>
    );
  } else if (error) {
    content = (
      <Box display="flex" justifyContent="center">
        <Alert severity="error" sx={{ maxWidth: 600 }}>
          {t('common.error')}
        </Alert>
      </Box>
    );
  } else if (paginatedTasks.length === 0) {
    content = (
      <Box display="flex" justifyContent="center">
        <Alert severity="info" sx={{ maxWidth: 600 }}>
          {t('common.no_data')}
        </Alert>
      </Box>
    );
  } else {
    content = (
      <Stack spacing={4} alignItems="stretch">
        <Grid container spacing={2}>
          {paginatedTasks.map((task: any) => (
            <Grid item xs={12} sm={6} md={8} lg={6} key={task.id}>
              <TaskCard task={task} onViewDetails={handleViewDetails} />
            </Grid>
          ))}
        </Grid>
        <Box display="flex" justifyContent="center">
          <TaskPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </Box>
      </Stack>
    );
  }

  return (
    <StyledPage title={t('layout.navbar.tasks_list')}>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Stack spacing={3} alignItems="center">
          {/* Filtres */}
          <Box width="100%" maxWidth={1000}>
            <TaskFilters
              categories={categories}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onReset={handleResetFilters}
            />
          </Box>

          {/* Tri */}
          <Box width="100%" maxWidth={1000} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <TaskSort
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSortChange={handleSortChange}
            />
          </Box>

          {/* Contenu aligné */}
          <Box width="100%" maxWidth={1000}>
            {content}
          </Box>
        </Stack>
      </Container>
    </StyledPage>
  );
}
