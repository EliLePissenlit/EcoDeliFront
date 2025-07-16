import { useState } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import { Message } from '@mui/icons-material';
import {
  Box,
  Card,
  Chip,
  Stack,
  Badge,
  Button,
  Avatar,
  Typography,
  IconButton,
  CardActions,
} from '@mui/material';

import { fCurrency } from 'src/utils/format-number';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';

import TaskStatusBadge from 'src/sections/tasks/components/task-status-badge';

import { TaskType, TaskStatus, useGetMyTasksQuery } from 'src/types/graphql/typeDefs';

// ----------------------------------------------------------------------

export default function MyTasksWithApplicationsCarousel() {
  const { t } = useTranslate();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);

  // Récupération des tâches de l'utilisateur
  const { data, loading } = useGetMyTasksQuery({
    fetchPolicy: 'cache-and-network',
  });

  // Filtrer les tâches avec des candidatures en attente
  const tasksWithPendingApplications =
    data?.getMyTasks?.filter(
      (task) =>
        task.status === TaskStatus.Published &&
        task.applications?.some((app) => app.status === 'PENDING')
    ) || [];

  if (loading) {
    return (
      <Card variant="blur" sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          {t('common.loading')}
        </Typography>
      </Card>
    );
  }

  if (tasksWithPendingApplications.length === 0) {
    return (
      <Card variant="blur" sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="subtitle1" gutterBottom>
          {t('dashboard.my_tasks_with_applications.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('dashboard.my_tasks_with_applications.no_tasks')}
        </Typography>
      </Card>
    );
  }

  const currentTask = tasksWithPendingApplications[currentIndex];
  const pendingApplications =
    currentTask.applications?.filter((app) => app.status === 'PENDING') || [];

  const displayName =
    currentTask.user.firstName && currentTask.user.lastName
      ? `${currentTask.user.firstName} ${currentTask.user.lastName}`
      : 'Utilisateur';

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : tasksWithPendingApplications.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < tasksWithPendingApplications.length - 1 ? prev + 1 : 0));
  };

  const handleViewDetails = () => {
    navigate(`/tasks/${currentTask.id}`);
  };

  const handleViewApplications = () => {
    navigate(`/tasks/${currentTask.id}`);
  };

  const handleSendMessage = () => {
    navigate(`/messages?taskId=${currentTask.id}`);
  };

  return (
    <Stack spacing={1.5}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="caption" color="text.secondary">
          {tasksWithPendingApplications.length} tâche
          {tasksWithPendingApplications.length > 1 ? 's' : ''} avec candidatures
        </Typography>
        <Stack direction="row" spacing={0.5}>
          <IconButton
            onClick={handlePrevious}
            disabled={tasksWithPendingApplications.length <= 1}
            size="small"
          >
            <Iconify icon="mdi:chevron-left" width={16} />
          </IconButton>
          <IconButton
            onClick={handleNext}
            disabled={tasksWithPendingApplications.length <= 1}
            size="small"
          >
            <Iconify icon="mdi:chevron-right" width={16} />
          </IconButton>
        </Stack>
      </Stack>

      <Box sx={{ position: 'relative' }}>
        <Card variant="blur" sx={{ p: 2 }}>
          {/* Image de la tâche si disponible */}
          {currentTask.fileUrl && (
            <Box
              sx={{
                height: 120,
                backgroundImage: `url(${currentTask.fileUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 1,
                mb: 2,
              }}
            />
          )}

          <Stack spacing={2}>
            {/* En-tête avec statut et nombre de candidatures */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={1} alignItems="center">
                <Badge badgeContent={pendingApplications.length} color="warning">
                  <Iconify icon="mdi:account-multiple-outline" width={20} />
                </Badge>
                <Typography variant="caption" color="text.secondary">
                  {pendingApplications.length} candidature
                  {pendingApplications.length > 1 ? 's' : ''} en attente
                </Typography>
              </Stack>
              <TaskStatusBadge status={currentTask.status} />
            </Stack>

            {/* Titre, avatar et description */}
            <Stack spacing={1}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  src={currentTask.user.avatar || undefined}
                  alt={displayName}
                  sx={{ width: 24, height: 24 }}
                />
                <Typography variant="subtitle1" component="h3" noWrap sx={{ flex: 1 }}>
                  {currentTask.title}
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  lineHeight: 1.3,
                }}
              >
                {currentTask.description}
              </Typography>
            </Stack>

            {/* Informations compactes en ligne */}
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="caption" color="text.secondary">
                  {t('common.category')}:
                </Typography>
                <Chip
                  label={currentTask.category?.name || t('common.not_specified')}
                  size="small"
                  sx={{
                    backgroundColor: currentTask.category?.color,
                    color: 'white',
                    height: 20,
                    fontSize: '0.7rem',
                  }}
                />
              </Stack>

              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="caption" color="text.secondary">
                  {t('tasks.form.basic_info.task_type_label')}:
                </Typography>
                <Typography variant="caption">
                  {currentTask.type === TaskType.Service
                    ? t('tasks.form.basic_info.service')
                    : t('tasks.form.shipping.title')}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="caption" color="text.secondary">
                  {t('common.price')}:
                </Typography>
                <Typography variant="subtitle2" fontWeight="bold">
                  {currentTask.calculatedPriceInCents
                    ? fCurrency(currentTask.calculatedPriceInCents / 100)
                    : t('tasks.messages.price_on_completion')}
                </Typography>
              </Stack>
            </Stack>

            {/* Date de création */}
            <Typography variant="caption" color="text.secondary">
              {t('common.created_at')}:{' '}
              {format(new Date(currentTask.createdAt), 'dd/MM/yyyy à HH:mm')}
            </Typography>
          </Stack>
        </Card>

        {/* Actions */}
        <CardActions sx={{ pt: 1, px: 0 }}>
          <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              onClick={handleViewDetails}
              startIcon={<Iconify icon="mdi:eye-outline" width={16} />}
            >
              {t('tasks.card.view_details')}
            </Button>

            <Button
              fullWidth
              variant="gradient"
              color="warning"
              size="small"
              onClick={handleViewApplications}
              startIcon={<Iconify icon="mdi:account-multiple-outline" width={16} />}
            >
              {t('dashboard.my_tasks_with_applications.view_applications')}
            </Button>

            <IconButton size="small" onClick={handleSendMessage}>
              <Message />
            </IconButton>
          </Stack>
        </CardActions>
      </Box>

      {/* Indicateurs de navigation */}
      {tasksWithPendingApplications.length > 1 && (
        <Stack direction="row" justifyContent="center" spacing={0.5}>
          {tasksWithPendingApplications.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: index === currentIndex ? 'primary.main' : 'divider',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                '&:hover': {
                  bgcolor: index === currentIndex ? 'primary.dark' : 'grey.400',
                },
              }}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
