import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { Message } from '@mui/icons-material';
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

import { fDate } from 'src/utils/format-time';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';

import { useGetMyTasksQuery, useCompleteTaskMutation } from 'src/types/graphql/typeDefs';

export default function TasksToCloseCarousel() {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [completeError, setCompleteError] = useState<string | null>(null);

  // Récupération des tâches de l'utilisateur (client) qui sont démarrées mais non complétées
  const { data, loading, refetch } = useGetMyTasksQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [completeTask, { loading: completing }] = useCompleteTaskMutation({
    onCompleted: () => {
      setCompleteDialogOpen(false);
      setSelectedTaskId(null);
      setCompleteError(null);
      enqueueSnackbar(t('tasks.actions.complete_success'), { variant: 'success' });
      refetch();
    },
    onError: (error) => {
      // Gestion des erreurs spécifiques
      const errorMessage = error.graphQLErrors?.[0]?.message || error.message || t('common.error');
      setCompleteError(errorMessage);
    },
  });

  const tasks = data?.getMyTasks || [];
  // Filtrer les tâches démarrées (avec une candidature acceptée et démarrée) mais non complétées
  const startedTasks = tasks.filter(
    (task) =>
      task.status === 'IN_PROGRESS' &&
      task.applications?.some(
        (app) => app.status === 'ACCEPTED' && app.startedAt && !app.completedAt
      )
  );

  const handleCompleteTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setCompleteDialogOpen(true);
    setCompleteError(null);
  };

  const confirmCompleteTask = () => {
    if (!selectedTaskId) return;

    setCompleteError(null);
    completeTask({
      variables: {
        taskId: selectedTaskId,
      },
    });
  };

  const handleCloseDialog = () => {
    setCompleteDialogOpen(false);
    setSelectedTaskId(null);
    setCompleteError(null);
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
          {t('dashboard.tasks_to_close.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Chargement...
        </Typography>
      </Card>
    );
  }

  if (startedTasks.length === 0) {
    return (
      <Card variant="blur" sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="subtitle1" gutterBottom>
          {t('dashboard.tasks_to_close.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('dashboard.tasks_to_close.no_tasks')}
        </Typography>
      </Card>
    );
  }

  return (
    <>
      <Stack spacing={1.5}>
        <Typography variant="caption" color="text.secondary">
          {startedTasks.length} tâche{startedTasks.length > 1 ? 's' : ''} à clôturer
        </Typography>
        <Stack spacing={2}>
          {startedTasks.map((task) => {
            // Trouver la candidature acceptée et démarrée
            const acceptedApplication = task.applications?.find(
              (app) => app.status === 'ACCEPTED' && app.startedAt && !app.completedAt
            );

            const providerName = acceptedApplication?.applicant
              ? `${acceptedApplication.applicant.firstName} ${
                  acceptedApplication.applicant.lastName?.charAt(0) || ''
                }.`
              : 'Prestataire';

            const displayName =
              task.user.firstName && task.user.lastName
                ? `${task.user.firstName} ${task.user.lastName}`
                : 'Utilisateur';

            return (
              <Box key={task.id} sx={{ position: 'relative' }}>
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
                        color="warning"
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

                    {/* Informations sur le prestataire */}
                    <Typography variant="caption" color="text.secondary">
                      Prestataire: {providerName}
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
                      startIcon={<Iconify icon="mdi:check-circle" width={16} />}
                      onClick={() => handleCompleteTask(task.id)}
                      disabled={completing}
                    >
                      {t('tasks.actions.complete')}
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

      {/* Dialog de confirmation pour compléter la tâche */}
      <Dialog open={completeDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{t('tasks.actions.complete_confirmation_title')}</DialogTitle>
        <DialogContent>
          {completeError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {completeError}
            </Alert>
          )}
          <Typography>{t('tasks.actions.complete_confirmation_message')}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t('common.cancel')}</Button>
          <Button onClick={confirmCompleteTask} variant="gradient" disabled={completing}>
            {completing ? t('common.loading') : t('tasks.actions.complete')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
