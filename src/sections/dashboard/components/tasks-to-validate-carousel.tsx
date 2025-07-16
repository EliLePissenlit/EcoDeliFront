import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';

import { Message, CheckCircle } from '@mui/icons-material';
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
import RHFCode from 'src/components/hook-form/rhf-code';

import {
  useGetMyApplicationsQuery,
  useValidateTaskCompletionMutation,
} from 'src/types/graphql/typeDefs';

// Type pour le formulaire de validation
type ValidationFormData = {
  validationCode: string;
};

export default function TasksToValidateCarousel() {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [validateDialogOpen, setValidateDialogOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Configuration du formulaire avec react-hook-form
  const methods = useForm<ValidationFormData>({
    defaultValues: {
      validationCode: '',
    },
  });

  const { handleSubmit, reset, watch } = methods;
  const validationCode = watch('validationCode');

  // Récupération des candidatures complétées en attente de validation
  const { data, loading, refetch } = useGetMyApplicationsQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [validateTaskCompletion, { loading: validating }] = useValidateTaskCompletionMutation({
    onCompleted: () => {
      setValidateDialogOpen(false);
      setSelectedTaskId(null);
      setValidationError(null);
      reset();
      enqueueSnackbar(t('tasks.actions.validate_success'), { variant: 'success' });
      refetch();
    },
    onError: (error) => {
      // Gestion des erreurs spécifiques
      const errorMessage = error.graphQLErrors?.[0]?.message || error.message || t('common.error');
      setValidationError(errorMessage);
    },
  });

  const applications = data?.getMyApplications || [];
  const completedApplications = applications.filter(
    (app) => app.status === 'COMPLETED' && app.completedAt && !app.validatedAt
  );

  const handleValidateTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setValidateDialogOpen(true);
    setValidationError(null);
    reset();
  };

  const onSubmit = (formData: ValidationFormData) => {
    if (!selectedTaskId || !formData.validationCode.trim()) return;

    setValidationError(null);
    validateTaskCompletion({
      variables: {
        taskId: selectedTaskId,
        validationCode: formData.validationCode.trim(),
      },
    });
  };

  const handleCloseDialog = () => {
    setValidateDialogOpen(false);
    setSelectedTaskId(null);
    setValidationError(null);
    reset();
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
          {t('dashboard.tasks_to_validate.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Chargement...
        </Typography>
      </Card>
    );
  }

  if (completedApplications.length === 0) {
    return (
      <Card variant="blur" sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="subtitle1" gutterBottom>
          {t('dashboard.tasks_to_validate.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('dashboard.tasks_to_validate.no_tasks')}
        </Typography>
      </Card>
    );
  }

  return (
    <>
      <Stack spacing={1.5}>
        <Typography variant="caption" color="text.secondary">
          {completedApplications.length} tâche{completedApplications.length > 1 ? 's' : ''} à
          valider
        </Typography>
        <Stack spacing={2}>
          {completedApplications.map((application) => {
            const { task } = application;
            const taskOwnerName =
              user?.id === task.user.id || user?.role === 'ADMIN'
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
                      startIcon={<CheckCircle />}
                      onClick={() => handleValidateTask(task.id)}
                      disabled={validating}
                    >
                      {t('tasks.actions.validate')}
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

      {/* Dialog de validation */}
      <Dialog open={validateDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{t('tasks.actions.validate_confirmation_title')}</DialogTitle>
        <DialogContent>
          {validationError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {validationError}
            </Alert>
          )}
          <Typography sx={{ mb: 2 }}>{t('tasks.actions.validate_confirmation_message')}</Typography>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <RHFCode name="validationCode" />
            </form>
          </FormProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t('common.cancel')}</Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="gradient"
            disabled={validating || !validationCode.trim()}
          >
            {validating ? t('common.loading') : t('tasks.actions.validate')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
