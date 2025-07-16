import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Card,
  Chip,
  Stack,
  Button,
  Dialog,
  Avatar,
  TextField,
  Typography,
  IconButton,
  CardActions,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';

import {
  useRejectTaskMutation,
  useApproveTaskMutation,
  useListPendingTasksQuery,
} from 'src/types/graphql/typeDefs';

export default function PendingTasksCarousel() {
  const { t } = useTranslate();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  // Récupération des tâches en attente
  const { data, loading, refetch } = useListPendingTasksQuery({
    fetchPolicy: 'cache-and-network',
  });

  // Mutations
  const [approveTask, { loading: approving }] = useApproveTaskMutation({
    onCompleted: () => {
      refetch();
    },
  });

  const [rejectTask, { loading: rejecting }] = useRejectTaskMutation({
    onCompleted: () => {
      setRejectDialogOpen(false);
      setRejectReason('');
      setSelectedTaskId(null);
      refetch();
    },
  });

  const pendingTasks = data?.listPendingTasks || [];

  const handleApproveTask = (taskId: string) => {
    approveTask({ variables: { id: taskId } });
  };

  const handleRejectTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setRejectDialogOpen(true);
  };

  const handleConfirmReject = () => {
    if (!selectedTaskId || !rejectReason.trim()) return;

    rejectTask({
      variables: {
        id: selectedTaskId,
        reason: rejectReason.trim(),
      },
    });
  };

  const handleViewTask = (taskId: string) => {
    navigate(`/tasks/${taskId}`);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(pendingTasks.length, 1));
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + Math.max(pendingTasks.length, 1)) % Math.max(pendingTasks.length, 1)
    );
  };

  if (loading) {
    return (
      <Card variant="blur" sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          {t('common.loading')}
        </Typography>
      </Card>
    );
  }

  if (pendingTasks.length === 0) {
    return (
      <Card variant="blur" sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="subtitle1" gutterBottom>
          {t('dashboard.pending_tasks.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('dashboard.pending_tasks.no_tasks')}
        </Typography>
      </Card>
    );
  }

  const currentTask = pendingTasks[currentIndex];
  const displayName =
    currentTask.user.firstName && currentTask.user.lastName
      ? `${currentTask.user.firstName} ${currentTask.user.lastName}`
      : 'Utilisateur';

  return (
    <>
      <Stack spacing={1.5}>
        {/* En-tête */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="text.secondary">
            {pendingTasks.length} tâche{pendingTasks.length > 1 ? 's' : ''}{' '}
            {t('dashboard.pending_tasks.status_pending')}
          </Typography>
          <Stack direction="row" spacing={0.5}>
            <IconButton onClick={handlePrevious} disabled={pendingTasks.length <= 1} size="small">
              <Iconify icon="mdi:chevron-left" width={16} />
            </IconButton>
            <IconButton onClick={handleNext} disabled={pendingTasks.length <= 1} size="small">
              <Iconify icon="mdi:chevron-right" width={16} />
            </IconButton>
          </Stack>
        </Stack>

        {/* Carte de la tâche */}
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
              {/* En-tête avec titre, avatar et statut */}
              <Stack direction="row" justifyContent="space-between" alignItems="center">
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
                <Chip
                  label={t('dashboard.pending_tasks.status_pending')}
                  color="warning"
                  size="small"
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
                {currentTask.description}
              </Typography>

              {/* Type et catégorie */}
              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                <Chip
                  label={t(
                    currentTask.type === 'SERVICE'
                      ? 'tasks.form.basic_info.service'
                      : 'tasks.form.basic_info.shipping'
                  )}
                  variant="outlined"
                  size="small"
                  icon={
                    currentTask.type === 'SERVICE' ? (
                      <Iconify icon="mdi:tools" width={16} />
                    ) : (
                      <Iconify icon="mdi:truck-delivery" width={16} />
                    )
                  }
                  color={currentTask.type === 'SERVICE' ? 'primary' : 'secondary'}
                />
                {currentTask.type === 'SHIPPING' && currentTask.shipping?.packageCategory && (
                  <Chip
                    label={(() => {
                      switch (currentTask.shipping.packageCategory) {
                        case 'SMALL':
                          return t('tasks.administration.package_categories.small');
                        case 'MEDIUM':
                          return t('tasks.administration.package_categories.medium');
                        case 'LARGE':
                          return t('tasks.administration.package_categories.large');
                        default:
                          return currentTask.shipping.packageCategory;
                      }
                    })()}
                    variant="outlined"
                    size="small"
                    color="info"
                  />
                )}
              </Stack>

              {/* Prix et date */}
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" color="primary" fontWeight="bold">
                  {(() => {
                    if (
                      currentTask.type === 'SHIPPING' &&
                      currentTask.shipping?.calculatedPriceInCents
                    ) {
                      return fCurrency(currentTask.shipping.calculatedPriceInCents / 100);
                    }
                    if (currentTask.calculatedPriceInCents) {
                      return fCurrency(currentTask.calculatedPriceInCents / 100);
                    }
                    return t('dashboard.pending_tasks.price_to_calculate');
                  })()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {fDate(currentTask.createdAt)}
                </Typography>
              </Stack>

              {/* Informations sur l'utilisateur */}
              <Typography variant="caption" color="text.secondary">
                {t('dashboard.pending_tasks.by')} {displayName}
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
                onClick={() => handleViewTask(currentTask.id)}
                startIcon={<Iconify icon="mdi:eye-outline" width={16} />}
              >
                {t('dashboard.pending_tasks.view_details')}
              </Button>
              <Button
                fullWidth
                variant="gradient"
                color="success"
                size="small"
                onClick={() => handleApproveTask(currentTask.id)}
                disabled={approving}
                startIcon={<Iconify icon="mdi:check" width={16} />}
              >
                {t('dashboard.pending_tasks.approve')}
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleRejectTask(currentTask.id)}
                disabled={rejecting}
                startIcon={<Iconify icon="mdi:close" width={16} />}
              >
                {t('dashboard.pending_tasks.reject')}
              </Button>
            </Stack>
          </CardActions>
        </Box>

        {/* Indicateurs de navigation */}
        {pendingTasks.length > 1 && (
          <Stack direction="row" justifyContent="center" spacing={0.5}>
            {pendingTasks.map((_, index) => (
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

      {/* Dialog de rejet */}
      <Dialog open={rejectDialogOpen} onClose={() => setRejectDialogOpen(false)}>
        <DialogTitle>{t('dashboard.pending_tasks.reject_dialog.title')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('dashboard.pending_tasks.reject_dialog.reason')}
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectDialogOpen(false)}>{t('common.cancel')}</Button>
          <Button
            onClick={handleConfirmReject}
            variant="gradient"
            color="error"
            disabled={!rejectReason.trim() || rejecting}
          >
            {rejecting
              ? t('dashboard.pending_tasks.rejecting')
              : t('dashboard.pending_tasks.reject')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
