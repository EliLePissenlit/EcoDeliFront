import debounce from 'lodash/debounce';
import React, { useState, useCallback } from 'react';

import { Table, Container, TableBody } from '@mui/material';

import { useTranslate } from 'src/locales';

import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import { TablePaginationCustom } from 'src/components/table';

import {
  useGetCategoriesQuery,
  GetCategoriesDocument,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from 'src/types/graphql/typeDefs';

import { TableHead, CategoryRow, TableHeader, SkeletonRow, CategoryModal } from './components';

type Order = 'asc' | 'desc';
type OrderBy = 'name' | 'color' | 'createdAt';

// ----------------------------------------------------------------------

export default function CategoriesAdministration() {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<OrderBy>('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dense, setDense] = useState(false);

  const { data: categoriesData, loading } = useGetCategoriesQuery();

  const [createCategory] = useCreateCategoryMutation({
    refetchQueries: [GetCategoriesDocument],
    onCompleted: () => {
      enqueueSnackbar(t('sections.categoriesAdministration.notifications.create_success'), {
        variant: 'success',
      });
      setIsModalOpen(false);
      setEditingCategory(null);
    },
    onError: () => {
      enqueueSnackbar(t('sections.categoriesAdministration.notifications.create_error'), {
        variant: 'error',
      });
    },
  });

  const [updateCategory] = useUpdateCategoryMutation({
    refetchQueries: [GetCategoriesDocument],
    onCompleted: () => {
      enqueueSnackbar(t('sections.categoriesAdministration.notifications.update_success'), {
        variant: 'success',
      });
      setIsModalOpen(false);
      setEditingCategory(null);
    },
    onError: () => {
      enqueueSnackbar(t('sections.categoriesAdministration.notifications.update_error'), {
        variant: 'error',
      });
    },
  });

  const [deleteCategory] = useDeleteCategoryMutation({
    refetchQueries: [GetCategoriesDocument],
    onCompleted: () => {
      enqueueSnackbar(t('sections.categoriesAdministration.notifications.delete_success'), {
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar(t('sections.categoriesAdministration.notifications.delete_error'), {
        variant: 'error',
      });
    },
  });

  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortCategories = (categories: any[]) =>
    categories.sort((a, b) => {
      if (orderBy === 'createdAt') {
        return order === 'asc'
          ? new Date(a[orderBy]).getTime() - new Date(b[orderBy]).getTime()
          : new Date(b[orderBy]).getTime() - new Date(a[orderBy]).getTime();
      }
      return order === 'asc'
        ? (a[orderBy] || '').localeCompare(b[orderBy] || '')
        : (b[orderBy] || '').localeCompare(a[orderBy] || '');
    });

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedCategories(categoriesData?.getCategories?.map((category) => category.id) || []);
    } else {
      setSelectedCategories([]);
    }
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    deleteCategory({
      variables: {
        id: categoryId,
      },
    });
  };

  const handleSaveCategory = (formData: any) => {
    if (editingCategory) {
      updateCategory({
        variables: {
          id: editingCategory.id,
          input: formData,
        },
      });
    } else {
      createCategory({
        variables: {
          input: formData,
        },
      });
    }
  };

  const filteredCategories = categoriesData?.getCategories?.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCategories = filteredCategories ? sortCategories([...filteredCategories]) : [];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetSearchQuery = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
    }, 300),
    []
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  return (
    <Container maxWidth="lg">
      <Scrollbar>
        <TableHeader
          searchQuery={searchQuery}
          selectedCategoriesCount={selectedCategories.length}
          onSearchChange={debouncedSetSearchQuery}
          onCreateCategory={handleOpenModal}
        />

        <Table size={dense ? 'small' : 'medium'}>
          <TableHead
            order={order}
            orderBy={orderBy}
            selectedCategoriesCount={selectedCategories.length}
            totalCategoriesCount={categoriesData?.getCategories?.length || 0}
            loading={loading}
            onRequestSort={handleRequestSort}
            onSelectAll={handleSelectAll}
          />
          <TableBody>
            {loading
              ? Array.from({ length: rowsPerPage }).map((_, index) => <SkeletonRow key={index} />)
              : sortedCategories
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((category) => (
                    <CategoryRow
                      key={category.id}
                      category={category}
                      isSelected={selectedCategories.includes(category.id)}
                      onSelectCategory={handleSelectCategory}
                      onEditCategory={handleEditCategory}
                      onDeleteCategory={handleDeleteCategory}
                    />
                  ))}
          </TableBody>
        </Table>

        <TablePaginationCustom
          count={sortedCategories.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          dense={dense}
          onChangeDense={handleChangeDense}
        />

        <CategoryModal
          open={isModalOpen}
          category={editingCategory}
          onClose={handleCloseModal}
          onSave={handleSaveCategory}
        />
      </Scrollbar>
    </Container>
  );
}
