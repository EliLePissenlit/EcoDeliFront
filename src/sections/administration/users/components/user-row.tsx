import React from 'react';
import { format } from 'date-fns';

import {
  Link,
  Chip,
  Stack,
  Avatar,
  TableRow,
  Checkbox,
  TableCell,
  Typography,
} from '@mui/material';

import { useTranslate } from 'src/locales';

import { Role } from 'src/types/graphql/typeDefs';

import RowMoreMenu from './row-more-menu';

// ----------------------------------------------------------------------

type User = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  avatar?: string | null;
  stripeCustomerId?: string | null;
  role: Role;
  isUserEmailVerified: boolean;
  isSuspended: boolean;
  isUnderSurveillance: boolean;
  lastLoginAt: string;
  createdAt: string;
};

type UserRowProps = {
  user: User;
  isSelected: boolean;
  onSelectUser: (userId: string) => void;
  onSuspendSuccess: () => void;
  onContactUser: (userId: string) => void;
};

// Fonction pour obtenir la couleur du rôle
const getRoleColor = (role: Role) => {
  switch (role) {
    case Role.SuperAdmin:
      return 'error';
    case Role.Admin:
      return 'warning';
    case Role.Partner:
      return 'info';
    case Role.Tester:
      return 'secondary';
    case Role.Basic:
    default:
      return 'default';
  }
};

// Fonction pour traduire le rôle
const getRoleLabel = (role: Role, t: any) => {
  switch (role) {
    case Role.SuperAdmin:
      return t('sections.usersAdministration.table.role.super_admin');
    case Role.Admin:
      return t('sections.usersAdministration.table.role.admin');
    case Role.Partner:
      return t('sections.usersAdministration.table.role.partner');
    case Role.Tester:
      return t('sections.usersAdministration.table.role.tester');
    case Role.Basic:
    default:
      return t('sections.usersAdministration.table.role.basic');
  }
};

export default function UserRow({
  user,
  isSelected,
  onSelectUser,
  onSuspendSuccess,
  onContactUser,
}: UserRowProps) {
  const { t } = useTranslate();

  const displayName =
    user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email;

  return (
    <TableRow key={user.id}>
      <TableCell padding="checkbox">
        <Checkbox checked={isSelected} onChange={() => onSelectUser(user.id)} />
      </TableCell>
      <TableCell>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={user.avatar || undefined} alt={displayName} />
          <Typography>{displayName}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        {user.stripeCustomerId ? (
          <Link
            href={`https://dashboard.stripe.com/customers/${user.stripeCustomerId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.stripeCustomerId}
          </Link>
        ) : (
          <Typography color="text.secondary">-</Typography>
        )}
      </TableCell>
      <TableCell>
        <Chip label={getRoleLabel(user.role, t)} color={getRoleColor(user.role)} size="small" />
      </TableCell>
      <TableCell>
        <Stack direction="row" spacing={1}>
          <Chip
            label={t('sections.usersAdministration.table.verified')}
            color={user.isUserEmailVerified ? 'success' : 'default'}
            size="small"
          />
          <Chip
            label={t('sections.usersAdministration.table.suspended')}
            color={user.isSuspended ? 'error' : 'default'}
            size="small"
          />
          <Chip
            label={t('sections.usersAdministration.table.under_surveillance')}
            color={user.isUnderSurveillance ? 'warning' : 'default'}
            size="small"
          />
        </Stack>
      </TableCell>
      <TableCell>
        <Stack spacing={0.5}>
          <Typography variant="body2" color="text.secondary">
            {t('sections.usersAdministration.table.last_login')}:{' '}
            {format(new Date(user.lastLoginAt), 'PPp')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('sections.usersAdministration.table.created')}:{' '}
            {format(new Date(user.createdAt), 'PPp')}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align="right">
        <RowMoreMenu
          user={{
            id: user.id,
            isSuspended: user.isSuspended,
            email: user.email,
          }}
          onSuspendSuccess={onSuspendSuccess}
          onContactUser={onContactUser}
        />
      </TableCell>
    </TableRow>
  );
}
