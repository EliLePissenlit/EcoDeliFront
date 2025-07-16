import debounce from 'lodash/debounce';
import React, { useState, useCallback } from 'react';

import { Table, Container, TableBody } from '@mui/material';

import { useTranslate } from 'src/locales';

import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import { TablePaginationCustom } from 'src/components/table';

import {
  useListUsersQuery,
  ListUsersDocument,
  useContactUsersMutation,
} from 'src/types/graphql/typeDefs';

import { UserRow, TableHead, TableHeader, SkeletonRow, ContactModal } from './components';

type Order = 'asc' | 'desc';
type OrderBy = 'email' | 'stripeCustomerId' | 'role' | 'lastLoginAt';

// ----------------------------------------------------------------------

export default function UsersAdministration() {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIndividualContactModalOpen, setIsIndividualContactModalOpen] = useState(false);
  const [individualContactUserId, setIndividualContactUserId] = useState<string>('');
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<OrderBy>('email');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dense, setDense] = useState(false);

  const { data: usersData, loading } = useListUsersQuery();

  const [contactUsers] = useContactUsersMutation({
    refetchQueries: [ListUsersDocument],
    onCompleted: () => {
      enqueueSnackbar(t('sections.usersAdministration.notifications.contact_success'), {
        variant: 'success',
      });
      setSelectedUsers([]);
      setMessage('');
      setIsModalOpen(false);
    },
    onError: () => {
      enqueueSnackbar(t('sections.usersAdministration.notifications.contact_error'), {
        variant: 'error',
      });
    },
  });

  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortUsers = (users: any[]) =>
    users.sort((a, b) => {
      if (orderBy === 'lastLoginAt') {
        return order === 'asc'
          ? new Date(a[orderBy]).getTime() - new Date(b[orderBy]).getTime()
          : new Date(b[orderBy]).getTime() - new Date(a[orderBy]).getTime();
      }
      if (orderBy === 'role') {
        return order === 'asc'
          ? (a[orderBy] || '').localeCompare(b[orderBy] || '')
          : (b[orderBy] || '').localeCompare(a[orderBy] || '');
      }
      return order === 'asc'
        ? (a[orderBy] || '').localeCompare(b[orderBy] || '')
        : (b[orderBy] || '').localeCompare(a[orderBy] || '');
    });

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedUsers(usersData?.listUsers?.map((user) => user.id) || []);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleContactSelectedUsers = () => {
    contactUsers({
      variables: {
        input: {
          users: selectedUsers,
          message,
        },
      },
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMessage('');
  };

  const handleContactIndividualUser = (userId: string) => {
    setIndividualContactUserId(userId);
    setIsIndividualContactModalOpen(true);
  };

  const handleCloseIndividualContactModal = () => {
    setIsIndividualContactModalOpen(false);
    setIndividualContactUserId('');
    setMessage('');
  };

  const handleContactIndividualUserSend = () => {
    contactUsers({
      variables: {
        input: {
          users: [individualContactUserId],
          message,
        },
      },
    });
  };

  const filteredUsers = usersData?.listUsers?.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedUsers = filteredUsers ? sortUsers([...filteredUsers]) : [];

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
          selectedUsersCount={selectedUsers.length}
          onSearchChange={debouncedSetSearchQuery}
          onContactSelected={handleOpenModal}
        />

        <Table size={dense ? 'small' : 'medium'}>
          <TableHead
            order={order}
            orderBy={orderBy}
            selectedUsersCount={selectedUsers.length}
            totalUsersCount={usersData?.listUsers?.length || 0}
            loading={loading}
            onRequestSort={handleRequestSort}
            onSelectAll={handleSelectAll}
          />
          <TableBody>
            {loading
              ? Array.from({ length: rowsPerPage }).map((_, index) => <SkeletonRow key={index} />)
              : sortedUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <UserRow
                      key={user.id}
                      user={user}
                      isSelected={selectedUsers.includes(user.id)}
                      onSelectUser={handleSelectUser}
                      onSuspendSuccess={() => {
                        // Optionally refresh data or handle success
                      }}
                      onContactUser={handleContactIndividualUser}
                    />
                  ))}
          </TableBody>
        </Table>

        <TablePaginationCustom
          count={sortedUsers.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          dense={dense}
          onChangeDense={handleChangeDense}
        />

        <ContactModal
          open={isModalOpen}
          message={message}
          selectedCount={selectedUsers.length}
          onClose={handleCloseModal}
          onMessageChange={setMessage}
          onSend={handleContactSelectedUsers}
        />

        <ContactModal
          open={isIndividualContactModalOpen}
          message={message}
          selectedCount={1}
          onClose={handleCloseIndividualContactModal}
          onMessageChange={setMessage}
          onSend={handleContactIndividualUserSend}
        />
      </Scrollbar>
    </Container>
  );
}
