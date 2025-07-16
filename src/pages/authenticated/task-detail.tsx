import { format } from 'date-fns';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {
  Box,
  Card,
  Grid,
  Chip,
  Stack,
  Alert,
  Button,
  Avatar,
  Dialog,
  Tooltip,
  Container,
  TextField,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';

import { useAuth } from 'src/hooks/use-auth';

import { useTranslate } from 'src/locales';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { TaskMap } from 'src/components/map';
import Markdown from 'src/components/markdown';
import StyledPage from 'src/components/styled-page';

import TaskStatusBadge from 'src/sections/tasks/components/task-status-badge';

import {
  TaskType,
  TaskStatus,
  PackageCategory,
  useGetTaskQuery,
  useApplyToTaskMutation,
  useCompleteTaskMutation,
  useAcceptApplicationMutation,
  useRejectApplicationMutation,
} from 'src/types/graphql/typeDefs';

// Composant pour afficher les informations de colis
const PackageInfo = ({
  packageDetails,
  packageCategory,
}: {
  packageDetails: any;
  packageCategory: PackageCategory;
}) => {
  const { t } = useTranslate();

  const getCategoryLabel = (category: PackageCategory) => {
    switch (category) {
      case PackageCategory.Small:
        return t('tasks.form.shipping.small');
      case PackageCategory.Medium:
        return t('tasks.form.shipping.medium');
      case PackageCategory.Large:
        return t('tasks.form.shipping.large');
      default:
        return 'Standard';
    }
  };

  const getCategoryColor = (category: PackageCategory) => {
    switch (category) {
      case PackageCategory.Small:
        return 'success';
      case PackageCategory.Medium:
        return 'warning';
      case PackageCategory.Large:
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Iconify icon="mdi:package-variant" width={20} />
        <Typography variant="subtitle2" color="text.secondary">
          {t('tasks.form.shipping.package_category_label')}:
        </Typography>
        <Chip
          label={getCategoryLabel(packageCategory)}
          size="small"
          color={getCategoryColor(packageCategory) as any}
          variant="outlined"
        />
      </Stack>

      {packageDetails && (
        <Stack spacing={1}>
          {packageDetails.weight && (
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                {t('tasks.form.shipping.weight_label')}:
              </Typography>
              <Typography variant="body2">{packageDetails.weight} kg</Typography>
            </Stack>
          )}
          {packageDetails.dimensions && (
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                {t('tasks.form.shipping.dimensions_label')}:
              </Typography>
              <Typography variant="body2">{packageDetails.dimensions}</Typography>
            </Stack>
          )}
          {(packageDetails.length || 0) > 0 &&
            (packageDetails.width || 0) > 0 &&
            (packageDetails.height || 0) > 0 && (
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  {t('tasks.form.shipping.length')} × {t('tasks.form.shipping.width')} ×{' '}
                  {t('tasks.form.shipping.height')}:
                </Typography>
                <Typography variant="body2">
                  {packageDetails.length} × {packageDetails.width} × {packageDetails.height} cm
                </Typography>
              </Stack>
            )}
        </Stack>
      )}
    </Stack>
  );
};

// Composant pour la timeline de shipping
const ShippingTimeline = ({ shipping }: { shipping: any }) => {
  const { t } = useTranslate();

  if (!shipping) return null;

  const formatDistance = (meters: number) => {
    if (meters < 1000) return `${meters}m`;
    return `${(meters / 1000).toFixed(1)}km`;
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h${remainingMinutes}min` : `${hours}h`;
  };

  return (
    <Stack spacing={2}>
      {/* Informations de distance et durée */}
      <Stack direction="row" spacing={3} alignItems="center">
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Iconify icon="mdi:map-marker-distance" width={16} />
          <Typography variant="body2" color="text.secondary">
            {formatDistance(shipping.estimatedDistanceInMeters)}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Iconify icon="mdi:clock-outline" width={16} />
          <Typography variant="body2" color="text.secondary">
            {formatDuration(shipping.estimatedDurationInMinutes)}
          </Typography>
        </Stack>
      </Stack>

      {/* Timeline des adresses */}
      <Stack spacing={2}>
        {/* Point de départ */}
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: 'success.main',
              mt: 0.5,
              border: '2px solid #fff',
              minWidth: 12,
              minHeight: 12,
            }}
          />
          <Stack spacing={0.5} sx={{ flex: 1 }}>
            <Typography variant="subtitle2" color="success.main" fontWeight="medium">
              {t('tasks.form.shipping.pickup_address_label')}
            </Typography>
            <Typography variant="body2">
              {shipping.pickupAddress?.fullAddress || t('common.no_data')}
            </Typography>
          </Stack>
        </Stack>

        {/* Ligne de connexion */}
        <Box
          sx={{
            width: 2,
            height: 30,
            bgcolor: 'divider',
            ml: 2.5,
          }}
        />

        {/* Point d'arrivée */}
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: 'error.main',
              mt: 0.5,
              border: '2px solid #fff',
              minWidth: 12,
              minHeight: 12,
            }}
          />
          <Stack spacing={0.5} sx={{ flex: 1 }}>
            <Typography variant="subtitle2" color="error.main" fontWeight="medium">
              {t('tasks.form.shipping.delivery_address_label')}
            </Typography>
            <Typography variant="body2">
              {shipping.deliveryAddress?.fullAddress || t('common.relay_point')}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default function TaskDetailPage() {
  const { t } = useTranslate();
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState('');
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);

  // Récupération de la tâche
  const { data, loading, error, refetch } = useGetTaskQuery({
    variables: { id: id! },
    fetchPolicy: 'cache-and-network',
  });

  // Mutations
  const [applyToTask, { loading: applying }] = useApplyToTaskMutation({
    onCompleted: () => {
      setApplyDialogOpen(false);
      setApplicationMessage('');
      // Refetch de la tâche pour voir la nouvelle candidature
      refetch();
    },
  });

  const [acceptApplication, { loading: accepting }] = useAcceptApplicationMutation({
    onCompleted: () => {
      // Refresh de la tâche
    },
  });

  const [rejectApplication, { loading: rejecting }] = useRejectApplicationMutation({
    onCompleted: () => {
      setRejectDialogOpen(false);
      setRejectReason('');
      setSelectedApplicationId(null);
    },
  });

  const [completeTask, { loading: completing }] = useCompleteTaskMutation({
    onCompleted: () => {
      // Refresh de la tâche
    },
  });

  const task = data?.getTask;

  // Handlers
  const handleApply = () => {
    if (!task || !applicationMessage.trim()) return;

    applyToTask({
      variables: {
        input: {
          taskId: task.id,
          message: applicationMessage,
        },
      },
    });
  };

  const handleAcceptApplication = (applicationId: string) => {
    acceptApplication({ variables: { applicationId } });
  };

  const handleRejectApplication = (applicationId: string) => {
    setSelectedApplicationId(applicationId);
    setRejectDialogOpen(true);
  };

  const handleConfirmReject = () => {
    if (!selectedApplicationId || !rejectReason.trim()) return;

    rejectApplication({
      variables: {
        applicationId: selectedApplicationId,
        reason: rejectReason,
      },
    });
  };

  const handleCompleteTask = () => {
    if (!task) return;

    completeTask({
      variables: {
        taskId: task.id,
      },
    });
  };

  const handleNavigateToMessages = () => {
    navigate(`/tasks/${id}/messages`);
  };

  const handleShare = async () => {
    if (!task) return;
    const taskUrl = `${window.location.origin}/tasks/${id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: task.title,
          text: task.description,
          url: taskUrl,
        });
      } else {
        await navigator.clipboard.writeText(taskUrl);
        // Ici on pourrait ajouter une notification de succès
      }
    } catch (err) {
      console.error('Erreur lors du partage:', err);
    }
  };

  if (loading) {
    return (
      <StyledPage title={t('tasks.detail.title')}>
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
            <CircularProgress size={60} />
          </Box>
        </Container>
      </StyledPage>
    );
  }

  if (error || !task) {
    return (
      <StyledPage title={t('tasks.detail.title')}>
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto' }}>
            {t('common.error')}
          </Alert>
        </Container>
      </StyledPage>
    );
  }

  // Logique pour afficher le nom complet
  const canSeeFullName =
    user?.id === task.userId || user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
  let displayName = 'Utilisateur';
  if (canSeeFullName) {
    if (task.user.firstName && task.user.lastName) {
      displayName = `${task.user.firstName} ${task.user.lastName}`;
    }
  } else if (task.user.firstName) {
    displayName = task.user.firstName;
  }

  // Logique pour les permissions
  const isOwner = user?.id === task.userId;
  const hasExistingApplication = task.applications?.some((app) => app.applicantId === user?.id);
  const canApply = task.status === TaskStatus.Published && !isOwner && !hasExistingApplication;
  const canManageApplications = task.status === TaskStatus.Published && isOwner;
  const canComplete = task.status === TaskStatus.InProgress && isOwner;

  // Logique pour le contact (admin ou application acceptée)
  const hasAcceptedApplication = task.applications?.some(
    (app) => app.applicantId === user?.id && app.status === 'ACCEPTED'
  );
  const canContact =
    isOwner || user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' || hasAcceptedApplication;

  // Logique pour le prix
  const getPriceDisplay = () => {
    if (task.type === TaskType.Shipping && task.shipping?.calculatedPriceInCents) {
      return `${(task.shipping.calculatedPriceInCents / 100).toLocaleString('fr-FR')} €`;
    }
    if (task.calculatedPriceInCents) {
      return `${(task.calculatedPriceInCents / 100).toLocaleString('fr-FR')} €`;
    }
    return t('tasks.messages.price_on_completion');
  };

  return (
    <StyledPage title={task.title}>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Stack spacing={4}>
          {/* En-tête avec image */}
          <Card sx={{ overflow: 'hidden' }}>
            {/* Image de la tâche si disponible */}
            {task.fileUrl && (
              <Box
                sx={{
                  height: 300,
                  backgroundImage: `url(${task.fileUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            )}

            <Box sx={{ p: 3 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
              >
                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="h4" component="h1">
                      {task.title}
                    </Typography>
                    <TaskStatusBadge status={task.status} />
                  </Stack>

                  <Markdown>{task.description}</Markdown>

                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={task.user.avatar || undefined} alt={displayName} />
                    <Typography variant="body2">
                      {t('tasks.detail.posted_by')} {displayName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {format(new Date(task.createdAt), 'dd/MM/yyyy à HH:mm')}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={1}>
                  {canApply && (
                    <Button
                      variant="gradient"
                      color="primary"
                      onClick={() => setApplyDialogOpen(true)}
                      startIcon={<Iconify icon="mdi:pencil-outline" />}
                    >
                      {t('tasks.detail.apply')}
                    </Button>
                  )}

                  {!isOwner && hasExistingApplication && (
                    <Chip
                      label={t('tasks.detail.already_applied')}
                      color="info"
                      variant="outlined"
                      icon={<Iconify icon="mdi:check-circle-outline" />}
                    />
                  )}

                  {canComplete && (
                    <Button
                      variant="gradient"
                      color="success"
                      onClick={handleCompleteTask}
                      disabled={completing}
                      startIcon={<Iconify icon="mdi:check-circle-outline" />}
                    >
                      {t('tasks.detail.complete')}
                    </Button>
                  )}

                  {(user?.role === 'ADMIN' ||
                    user?.role === 'SUPER_ADMIN' ||
                    (canContact && !isOwner)) && (
                    <Tooltip title={t('tasks.detail.messages')}>
                      <IconButton onClick={handleNavigateToMessages} color="primary">
                        <Iconify icon="mdi:message-outline" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Stack>
              </Stack>
            </Box>
          </Card>

          {/* Informations détaillées */}
          <Grid container spacing={3}>
            {/* Colonne principale */}
            <Grid item xs={12} md={8}>
              <Stack spacing={3}>
                {/* Informations de base */}
                <Card sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {t('tasks.detail.basic_info')}
                  </Typography>
                  <Stack spacing={2}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {t('tasks.detail.category')}:
                      </Typography>
                      {task.category && (
                        <Box
                          sx={{
                            width: 200,
                            height: 200,
                            borderRadius: 2,
                            backgroundColor: task.category.color || 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            position: 'relative',
                          }}
                        >
                          {task.category.fileUrl ? (
                            <Image
                              src={task.category.fileUrl}
                              alt={task.category.name}
                              sx={{ width: 1, height: 1, objectFit: 'cover' }}
                              disabledEffect
                            />
                          ) : (
                            <Typography variant="h4" color="white">
                              {task.category.name.charAt(0).toUpperCase()}
                            </Typography>
                          )}
                          <Chip
                            label={task.category.name}
                            size="small"
                            sx={{
                              position: 'absolute',
                              bottom: 12,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              bgcolor: 'rgba(255,255,255,0.92)',
                              color: 'text.primary',
                              fontWeight: 'bold',
                              px: 2,
                              py: 1,
                              fontSize: '1.05rem',
                              boxShadow: 2,
                            }}
                          />
                        </Box>
                      )}
                    </Stack>

                    {task.type === TaskType.Service && task.estimatedDuration && (
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          {t('tasks.detail.estimated_duration')}:
                        </Typography>
                        <Typography variant="body2">
                          {task.estimatedDuration} {t('tasks.detail.hours')}
                        </Typography>
                      </Stack>
                    )}

                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        {t('tasks.detail.price')}:
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {getPriceDisplay()}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>

                {/* Détails spécifiques au type */}
                {task.type === TaskType.Shipping && task.shipping && (
                  <Card sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      {t('tasks.summary.shipping_details')}
                    </Typography>
                    <Stack spacing={3}>
                      <PackageInfo
                        packageDetails={task.shipping.packageDetails}
                        packageCategory={task.shipping.packageCategory}
                      />
                      <ShippingTimeline shipping={task.shipping} />
                    </Stack>
                  </Card>
                )}

                {/* Applications */}
                {task.applications && task.applications.length > 0 && (
                  <Card sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      {t('tasks.detail.applications')} ({task.applications?.length})
                    </Typography>
                    <Stack spacing={2}>
                      {task.applications?.map((application) => {
                        const canSeeApplicantFullName =
                          user?.id === application.applicantId ||
                          user?.role === 'ADMIN' ||
                          user?.role === 'SUPER_ADMIN';
                        let applicantName = 'Utilisateur';
                        if (canSeeApplicantFullName) {
                          if (application.applicant.firstName && application.applicant.lastName) {
                            applicantName = `${application.applicant.firstName} ${application.applicant.lastName}`;
                          }
                        } else if (application.applicant.firstName) {
                          applicantName = application.applicant.firstName;
                        }

                        return (
                          <Box
                            key={application.id}
                            sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}
                          >
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="flex-start"
                              spacing={2}
                            >
                              <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                  <Avatar
                                    src={application.applicant.avatar || undefined}
                                    alt={applicantName}
                                    sx={{ width: 32, height: 32 }}
                                  />
                                  <Typography variant="body2" fontWeight="medium">
                                    {applicantName}
                                  </Typography>
                                  <Chip
                                    label={t(
                                      `tasks.applications.status.${application.status.toLowerCase()}`
                                    )}
                                    size="small"
                                    color={application.status === 'PENDING' ? 'warning' : 'success'}
                                  />
                                </Stack>
                                <Typography variant="body2" color="text.secondary">
                                  {application.message}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {format(new Date(application.createdAt), 'dd/MM/yyyy à HH:mm')}
                                </Typography>
                              </Stack>

                              {canManageApplications && application.status === 'PENDING' && (
                                <Stack direction="row" spacing={1}>
                                  <Button
                                    size="small"
                                    variant="gradient"
                                    color="success"
                                    onClick={() => handleAcceptApplication(application.id)}
                                    disabled={accepting}
                                  >
                                    {t('tasks.applications.accept')}
                                  </Button>
                                  <Button
                                    size="small"
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handleRejectApplication(application.id)}
                                    disabled={rejecting}
                                  >
                                    {t('tasks.applications.reject')}
                                  </Button>
                                </Stack>
                              )}
                            </Stack>
                          </Box>
                        );
                      })}
                    </Stack>
                  </Card>
                )}
              </Stack>
            </Grid>

            {/* Colonne latérale */}
            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                {/* Carte */}
                <Card sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {task.type === TaskType.Service
                      ? t('tasks.detail.location')
                      : t('tasks.detail.shipping_route')}
                  </Typography>
                  <TaskMap task={task} height={250} />
                </Card>

                {/* Actions rapides */}
                <Card sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {t('tasks.detail.quick_actions')}
                  </Typography>
                  <Stack spacing={2}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Iconify icon="mdi:share-outline" />}
                      onClick={handleShare}
                    >
                      {t('tasks.detail.share')}
                    </Button>

                    {canContact &&
                      !isOwner &&
                      user?.role !== 'ADMIN' &&
                      user?.role !== 'SUPER_ADMIN' && (
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<Iconify icon="mdi:message-outline" />}
                          onClick={handleNavigateToMessages}
                        >
                          {t('tasks.detail.contact')}
                        </Button>
                      )}
                  </Stack>
                </Card>

                {/* Informations supplémentaires */}
                <Card sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {t('tasks.detail.additional_info')}
                  </Typography>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        {t('tasks.detail.validation_code')}:
                      </Typography>
                      <Typography variant="body2" fontFamily="monospace">
                        {task.validationCode || 'N/A'}
                      </Typography>
                    </Stack>

                    {task.completedAt && (
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          {t('tasks.detail.completed_at')}:
                        </Typography>
                        <Typography variant="body2">
                          {format(new Date(task.completedAt), 'dd/MM/yyyy à HH:mm')}
                        </Typography>
                      </Stack>
                    )}

                    {task.validatedAt && (
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          {t('tasks.detail.validated_at')}:
                        </Typography>
                        <Typography variant="body2">
                          {format(new Date(task.validatedAt), 'dd/MM/yyyy à HH:mm')}
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Stack>

        {/* Dialog de candidature */}
        <Dialog
          open={applyDialogOpen}
          onClose={() => setApplyDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{t('tasks.detail.apply_dialog.title')}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label={t('tasks.detail.apply_dialog.message')}
              fullWidth
              multiline
              rows={4}
              value={applicationMessage}
              onChange={(e) => setApplicationMessage(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setApplyDialogOpen(false)}>{t('common.cancel')}</Button>
            <Button
              onClick={handleApply}
              variant="gradient"
              disabled={applying || !applicationMessage.trim()}
            >
              {applying ? t('common.sending') : t('tasks.detail.apply')}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog de rejet */}
        <Dialog
          open={rejectDialogOpen}
          onClose={() => setRejectDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{t('tasks.detail.reject_dialog.title')}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label={t('tasks.detail.reject_dialog.reason')}
              fullWidth
              multiline
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setRejectDialogOpen(false)}>{t('common.cancel')}</Button>
            <Button
              onClick={handleConfirmReject}
              variant="gradient"
              color="error"
              disabled={rejecting || !rejectReason.trim()}
            >
              {rejecting ? t('common.sending') : t('tasks.applications.reject')}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </StyledPage>
  );
}
