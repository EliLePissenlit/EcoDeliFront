import debounce from 'lodash/debounce';
import React, { useState, useCallback } from 'react';

import { Table, Container, TableBody } from '@mui/material';

import { useTranslate } from 'src/locales';

import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import { TablePaginationCustom } from 'src/components/table';

import {
  useRelayPointsQuery,
  RelayPointsDocument,
  useCreateRelayPointMutation,
  useUpdateRelayPointMutation,
  useDeleteRelayPointMutation,
} from 'src/types/graphql/typeDefs';

import { TableHead, TableHeader, SkeletonRow, RelayPointRow, RelayPointModal } from './components';

type Order = 'asc' | 'desc';
type OrderBy = 'name' | 'description' | 'createdAt';

// ----------------------------------------------------------------------

export default function RelayPointsAdministration() {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();
  const [selectedRelayPoints, setSelectedRelayPoints] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRelayPoint, setEditingRelayPoint] = useState<any>(null);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<OrderBy>('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dense, setDense] = useState(false);

  const { data: relayPointsData, loading } = useRelayPointsQuery();

  const [createRelayPoint] = useCreateRelayPointMutation({
    refetchQueries: [RelayPointsDocument],
    onCompleted: () => {
      enqueueSnackbar(t('sections.relayPointsAdministration.notifications.create_success'), {
        variant: 'success',
      });
      setIsModalOpen(false);
      setEditingRelayPoint(null);
    },
    onError: () => {
      enqueueSnackbar(t('sections.relayPointsAdministration.notifications.create_error'), {
        variant: 'error',
      });
    },
  });

  const [updateRelayPoint] = useUpdateRelayPointMutation({
    refetchQueries: [RelayPointsDocument],
    onCompleted: () => {
      enqueueSnackbar(t('sections.relayPointsAdministration.notifications.update_success'), {
        variant: 'success',
      });
      setIsModalOpen(false);
      setEditingRelayPoint(null);
    },
    onError: () => {
      enqueueSnackbar(t('sections.relayPointsAdministration.notifications.update_error'), {
        variant: 'error',
      });
    },
  });

  const [deleteRelayPoint] = useDeleteRelayPointMutation({
    refetchQueries: [RelayPointsDocument],
    onCompleted: () => {
      enqueueSnackbar(t('sections.relayPointsAdministration.notifications.delete_success'), {
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar(t('sections.relayPointsAdministration.notifications.delete_error'), {
        variant: 'error',
      });
    },
  });

  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortRelayPoints = (relayPoints: any[]) =>
    relayPoints.sort((a, b) => {
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
      setSelectedRelayPoints(
        relayPointsData?.relayPoints?.map((relayPoint) => relayPoint.id) || []
      );
    } else {
      setSelectedRelayPoints([]);
    }
  };

  const handleSelectRelayPoint = (relayPointId: string) => {
    setSelectedRelayPoints((prev) =>
      prev.includes(relayPointId)
        ? prev.filter((id) => id !== relayPointId)
        : [...prev, relayPointId]
    );
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRelayPoint(null);
  };

  const handleEditRelayPoint = (relayPoint: any) => {
    setEditingRelayPoint(relayPoint);
    setIsModalOpen(true);
  };

  const handleDeleteRelayPoint = (relayPointId: string) => {
    deleteRelayPoint({
      variables: {
        id: relayPointId,
      },
    });
  };

  const handleSaveRelayPoint = (formData: any) => {
    if (editingRelayPoint) {
      updateRelayPoint({
        variables: {
          id: editingRelayPoint.id,
          input: formData,
        },
      });
    } else {
      createRelayPoint({
        variables: {
          input: formData,
        },
      });
    }
  };

  const filteredRelayPoints = relayPointsData?.relayPoints?.filter(
    (relayPoint) =>
      relayPoint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      relayPoint.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedRelayPoints = filteredRelayPoints ? sortRelayPoints([...filteredRelayPoints]) : [];

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
          selectedRelayPointsCount={selectedRelayPoints.length}
          onSearchChange={debouncedSetSearchQuery}
          onCreateRelayPoint={handleOpenModal}
        />

        <Table size={dense ? 'small' : 'medium'}>
          <TableHead
            order={order}
            orderBy={orderBy}
            selectedRelayPointsCount={selectedRelayPoints.length}
            totalRelayPointsCount={relayPointsData?.relayPoints?.length || 0}
            loading={loading}
            onRequestSort={handleRequestSort}
            onSelectAll={handleSelectAll}
          />
          <TableBody>
            {loading
              ? Array.from({ length: rowsPerPage }).map((_, index) => <SkeletonRow key={index} />)
              : sortedRelayPoints
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((relayPoint) => (
                    <RelayPointRow
                      key={relayPoint.id}
                      relayPoint={relayPoint}
                      isSelected={selectedRelayPoints.includes(relayPoint.id)}
                      onSelectRelayPoint={handleSelectRelayPoint}
                      onEditRelayPoint={handleEditRelayPoint}
                      onDeleteRelayPoint={handleDeleteRelayPoint}
                    />
                  ))}
          </TableBody>
        </Table>

        <TablePaginationCustom
          count={sortedRelayPoints.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          dense={dense}
          onChangeDense={handleChangeDense}
        />

        <RelayPointModal
          open={isModalOpen}
          relayPoint={editingRelayPoint}
          onClose={handleCloseModal}
          onSave={handleSaveRelayPoint}
        />
      </Scrollbar>
    </Container>
  );
}
