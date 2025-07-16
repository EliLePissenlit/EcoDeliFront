import React from 'react';

import { Chip } from '@mui/material';

import { useTranslate } from 'src/locales';

import { TaskStatus } from 'src/types/graphql/typeDefs';

// ----------------------------------------------------------------------

type TaskStatusBadgeProps = {
  status: TaskStatus;
};

// Fonction pour obtenir la couleur du statut
const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.Draft:
      return 'default';
    case TaskStatus.Published:
      return 'warning';
    case TaskStatus.InProgress:
      return 'info';
    case TaskStatus.Completed:
    case TaskStatus.Done:
      return 'success';
    case TaskStatus.Cancelled:
      return 'error';
    default:
      return 'default';
  }
};

// Fonction pour traduire le statut
const getStatusLabel = (status: TaskStatus, t: any) => {
  // On convertit le statut en snake_case pour matcher la clé de traduction
  const statusKey = String(status)
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .toLowerCase();
  return t(`tasks.status.${statusKey}`);
};

export default function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const { t } = useTranslate();

  return (
    <Chip
      label={getStatusLabel(status, t)}
      color={getStatusColor(status)}
      size="small"
      variant="filled"
    />
  );
}
