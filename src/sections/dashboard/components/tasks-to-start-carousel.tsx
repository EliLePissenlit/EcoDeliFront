import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { Message, PlayArrow } from '@mui/icons-material';
import {
  Box,
  Card,
  Chip,
  Stack,
  Alert,
  Button,
  Dialog,
  Avatar,
  Typography,
  IconButton,
  CardActions,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { useAuth } from 'src/hooks/use-auth';

import { fDate } from 'src/utils/format-time';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';

import { useStartTaskMutation, useGetMyApplicationsQuery } from 'src/types/graphql/typeDefs';

export default function TasksToStartCarousel() {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [startDialogOpen, setStartDialogOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [startError, setStartError] = useState<string | null>(null);

  // Récupération des candidatures acceptées non démarrées
  const { data, loading, refetch } = useGetMyApplicationsQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [startTask, { loading: starting }] = useStartTaskMutation({
    onCompleted: () => {
      setStartDialogOpen(false);
      setSelectedTaskId(null);
      setStartError(null);
      enqueueSnackbar(t('tasks.actions.start_success'), { variant: 'success' });
      refetch();
    },
    onError: (error) => {
      // Gestion des erreurs spécifiques
      const errorMessage = error.graphQLErrors?.[0]?.message || error.message || t('common.error');
      setStartError(errorMessage);
    },
  });

  const applications = data?.getMyApplications || [];
  const acceptedApplications = applications.filter(
    (app) => app.status === 'ACCEPTED' && !app.startedAt
  );

  const handleStartTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setStartDialogOpen(true);
    setStartError(null);
  };

  const confirmStartTask = () => {
    if (!selectedTaskId) return;

    setStartError(null);
    startTask({
      variables: {
        taskId: selectedTaskId,
      },
    });
  };

  const handleCloseDialog = () => {
    setStartDialogOpen(false);
    setSelectedTaskId(null);
    setStartError(null);
  };

  const handleViewTask = (taskId: string) => {
    navigate(`/tasks/${taskId}`);
  };

  const handleSendMessage = (taskId: string) => {
    navigate(`/tasks/${taskId}/messages`);
  };

  if (loading) {
    return (
      <Card variant="blur" sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="subtitle1" gutterBottom>
          {t('dashboard.tasks_to_start.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Chargement...
        </Typography>
      </Card>
    );
  }

  if (acceptedApplications.length === 0) {
    return (
      <Card variant="blur" sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="subtitle1" gutterBottom>
          {t('dashboard.tasks_to_start.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('dashboard.tasks_to_start.no_tasks')}
        </Typography>
      </Card>
    );
  }

  return (
    <>
      <Stack spacing={1.5}>
        <Typography variant="caption" color="text.secondary">
          {acceptedApplications.length} tâche{acceptedApplications.length > 1 ? 's' : ''} à démarrer
        </Typography>
        <Stack spacing={2}>
          {acceptedApplications.map((application) => {
            const { task } = application;
            const taskOwnerName =
              user?.id === task.user.id || user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN'
                ? `${task.user.firstName} ${task.user.lastName || ''}`
                : `${task.user.firstName} ${task.user.lastName?.charAt(0) || ''}.`;

            const displayName =
              task.user.firstName && task.user.lastName
                ? `${task.user.firstName} ${task.user.lastName}`
                : 'Utilisateur';

            return (
              <Box key={application.id} sx={{ position: 'relative' }}>
                <Card variant="blur" sx={{ p: 2 }}>
                  {/* Image de la tâche si disponible */}
                  {task.fileUrl && (
                    <Box
                      sx={{
                        height: 120,
                        backgroundImage: `url(${task.fileUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: 1,
                        mb: 2,
                      }}
                    />
                  )}

                  <Stack spacing={2}>
                    {/* En-tête avec titre, avatar et statut */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar
                          src={task.user.avatar || undefined}
                          alt={displayName}
                          sx={{ width: 24, height: 24 }}
                        />
                        <Typography variant="subtitle1" component="h3" noWrap sx={{ flex: 1 }}>
                          {task.title}
                        </Typography>
                      </Stack>
                      <Chip
                        label={t(`tasks.status.${task.status.toLowerCase()}`)}
                        size="small"
                        color="success"
                      />
                    </Stack>

                    {/* Description */}
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
                      {task.description}
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                      {task.category && (
                        <Chip label={task.category.name} size="small" variant="outlined" />
                      )}
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle2" fontWeight="bold">
                        {(() => {
                          if (task.type === 'SHIPPING' && task.shipping?.calculatedPriceInCents) {
                            return `${(task.shipping.calculatedPriceInCents / 100).toLocaleString(
                              'fr-FR'
                            )} €`;
                          }
                          if (task.calculatedPriceInCents) {
                            return `${(task.calculatedPriceInCents / 100).toLocaleString(
                              'fr-FR'
                            )} €`;
                          }
                          return t('tasks.messages.price_on_completion');
                        })()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {fDate(task.createdAt)}
                      </Typography>
                    </Stack>

                    {/* Informations sur le client */}
                    <Typography variant="caption" color="text.secondary">
                      Client: {taskOwnerName}
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
                      onClick={() => handleViewTask(task.id)}
                      startIcon={<Iconify icon="mdi:eye-outline" width={16} />}
                    >
                      {t('tasks.card.view_details')}
                    </Button>
                    <Button
                      fullWidth
                      variant="gradient"
                      size="small"
                      startIcon={<PlayArrow />}
                      onClick={() => handleStartTask(task.id)}
                      disabled={starting}
                    >
                      {t('tasks.actions.start')}
                    </Button>
                    <IconButton size="small" onClick={() => handleSendMessage(task.id)}>
                      <Message />
                    </IconButton>
                  </Stack>
                </CardActions>
              </Box>
            );
          })}
        </Stack>
      </Stack>

      {/* Dialog de confirmation pour démarrer la tâche */}
      <Dialog open={startDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{t('tasks.actions.start_confirmation_title')}</DialogTitle>
        <DialogContent>
          {startError && <Alert severity="error">{startError}</Alert>}
          <Typography>{t('tasks.actions.start_confirmation_message')}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t('common.cancel')}</Button>
          <Button onClick={confirmStartTask} variant="gradient" disabled={starting}>
            {starting ? t('common.loading') : t('tasks.actions.start')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
