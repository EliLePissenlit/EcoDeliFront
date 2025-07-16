import { useNavigate } from 'react-router-dom';
import React, { useMemo, useState } from 'react';

import {
  Box,
  Tab,
  Card,
  Chip,
  Tabs,
  Grid,
  Stack,
  Alert,
  Button,
  Dialog,
  TextField,
  Container,
  Typography,
  CardContent,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import StyledPage from 'src/components/styled-page';

import {
  TaskStatus,
  useRejectTaskMutation,
  useApproveTaskMutation,
  useListPendingTasksQuery,
  useListTasksByStatusQuery,
} from 'src/types/graphql/typeDefs';

// ----------------------------------------------------------------------

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tasks-tabpanel-${index}`}
      aria-labelledby={`tasks-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

// ----------------------------------------------------------------------

export default function TasksAdminPage() {
  const { t } = useTranslate();
  const navigate = useNavigate();

  const [tabValue, setTabValue] = useState(0);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  // Queries pour différents statuts
  const {
    data: pendingData,
    loading: loadingPending,
    refetch: refetchPending,
  } = useListPendingTasksQuery({
    fetchPolicy: 'cache-and-network',
  });

  const {
    data: publishedData,
    loading: loadingPublished,
    refetch: refetchPublished,
  } = useListTasksByStatusQuery({
    variables: { status: TaskStatus.Published },
    fetchPolicy: 'cache-and-network',
  });

  const { data: inProgressData, loading: loadingInProgress } = useListTasksByStatusQuery({
    variables: { status: TaskStatus.InProgress },
    fetchPolicy: 'cache-and-network',
  });

  const { data: completedData, loading: loadingCompleted } = useListTasksByStatusQuery({
    variables: { status: TaskStatus.Completed },
    fetchPolicy: 'cache-and-network',
  });

  const {
    data: cancelledData,
    loading: loadingCancelled,
    refetch: refetchCancelled,
  } = useListTasksByStatusQuery({
    variables: { status: TaskStatus.Cancelled },
    fetchPolicy: 'cache-and-network',
  });

  // Mutations
  const [approveTask, { loading: approving }] = useApproveTaskMutation({
    onCompleted: () => {
      refetchPending();
      refetchPublished();
    },
  });

  const [rejectTask, { loading: rejecting }] = useRejectTaskMutation({
    onCompleted: () => {
      setRejectDialogOpen(false);
      setRejectReason('');
      setSelectedTaskId(null);
      refetchPending();
      refetchCancelled();
    },
  });

  // Données par onglet
  const tabData = useMemo(
    () => [
      {
        label: t('tasks.administration.pending'),
        count: pendingData?.listPendingTasks?.length || 0,
        data: pendingData?.listPendingTasks || [],
        loading: loadingPending,
      },
      {
        label: t('tasks.administration.published'),
        count: publishedData?.listTasksByStatus?.length || 0,
        data: publishedData?.listTasksByStatus || [],
        loading: loadingPublished,
      },
      {
        label: t('tasks.administration.in_progress'),
        count: inProgressData?.listTasksByStatus?.length || 0,
        data: inProgressData?.listTasksByStatus || [],
        loading: loadingInProgress,
      },
      {
        label: t('tasks.administration.completed'),
        count: completedData?.listTasksByStatus?.length || 0,
        data: completedData?.listTasksByStatus || [],
        loading: loadingCompleted,
      },
      {
        label: t('tasks.administration.cancelled'),
        count: cancelledData?.listTasksByStatus?.length || 0,
        data: cancelledData?.listTasksByStatus || [],
        loading: loadingCancelled,
      },
    ],
    [
      pendingData,
      publishedData,
      inProgressData,
      completedData,
      cancelledData,
      loadingPending,
      loadingPublished,
      loadingInProgress,
      loadingCompleted,
      loadingCancelled,
      t,
    ]
  );

  // Handlers
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.Draft:
        return 'default';
      case TaskStatus.Published:
        return 'success';
      case TaskStatus.InProgress:
        return 'warning';
      case TaskStatus.Completed:
        return 'info';
      case TaskStatus.Done:
        return 'success';
      case TaskStatus.Cancelled:
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.Draft:
        return t('tasks.status.draft');
      case TaskStatus.Published:
        return t('tasks.status.published');
      case TaskStatus.InProgress:
        return t('tasks.status.in_progress');
      case TaskStatus.Completed:
        return t('tasks.status.completed');
      case TaskStatus.Done:
        return t('tasks.status.completed'); // ou t('tasks.status.done') si tu veux une clé séparée
      case TaskStatus.Cancelled:
        return t('tasks.status.cancelled');
      default:
        return status;
    }
  };

  const renderTaskCard = (task: any) => (
    <Card
      key={task.id}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 3,
        },
      }}
      onClick={() => handleViewTask(task.id)}
    >
      <CardContent>
        <Stack spacing={2}>
          {/* En-tête avec titre et statut */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" noWrap>
                {task.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {t('tasks.administration.by')} {task.user.firstName} {task.user.lastName}
              </Typography>
            </Box>
            <Chip
              label={getStatusLabel(task.status)}
              color={getStatusColor(task.status)}
              size="small"
            />
          </Stack>

          {/* Type et catégorie */}
          <Stack direction="row" spacing={1}>
            {task.category && <Chip label={task.category.name} variant="outlined" size="small" />}
            {task.type === 'SHIPPING' && task.shipping?.packageCategory && (
              <Chip
                label={(() => {
                  switch (task.shipping.packageCategory) {
                    case 'SMALL':
                      return t('tasks.administration.package_categories.small');
                    case 'MEDIUM':
                      return t('tasks.administration.package_categories.medium');
                    case 'LARGE':
                      return t('tasks.administration.package_categories.large');
                    default:
                      return task.shipping.packageCategory;
                  }
                })()}
                variant="outlined"
                size="small"
                color="info"
              />
            )}
          </Stack>

          {/* Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {task.description}
          </Typography>

          {/* Prix et date */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              {(() => {
                if (task.type === 'SHIPPING' && task.shipping?.calculatedPriceInCents) {
                  return fCurrency(task.shipping.calculatedPriceInCents / 100);
                }
                if (task.calculatedPriceInCents) {
                  return fCurrency(task.calculatedPriceInCents / 100);
                }
                return 'Prix à calculer';
              })()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {fDate(task.createdAt)}
            </Typography>
          </Stack>

          {/* Actions pour les tâches en attente */}
          {task.status === TaskStatus.Draft && (
            <Stack direction="row" spacing={1}>
              <Button
                variant="gradient"
                color="success"
                size="small"
                startIcon={<Iconify icon="mdi:check" />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleApproveTask(task.id);
                }}
                disabled={approving}
              >
                {t('tasks.administration.approve')}
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<Iconify icon="mdi:close" />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRejectTask(task.id);
                }}
                disabled={rejecting}
              >
                {t('tasks.administration.reject')}
              </Button>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <StyledPage title={t('tasks.administration.title')}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            {t('tasks.administration.title')}
          </Typography>

          {/* Onglets */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="tâches tabs">
              {tabData.map((tab, index) => (
                <Tab
                  key={index}
                  label={`${tab.label} (${tab.count})`}
                  id={`tasks-tab-${index}`}
                  aria-controls={`tasks-tabpanel-${index}`}
                />
              ))}
            </Tabs>
          </Box>

          {/* Contenu des onglets */}
          {tabData.map((tab, index) => (
            <TabPanel key={index} value={tabValue} index={index}>
              {(() => {
                if (tab.loading) {
                  return (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                      <CircularProgress size={60} />
                    </Box>
                  );
                }

                if (tab.data.length === 0) {
                  return (
                    <Alert severity="info" sx={{ maxWidth: 600, mx: 'auto' }}>
                      {t('tasks.administration.no_tasks')}
                    </Alert>
                  );
                }

                return (
                  <Grid container spacing={2}>
                    {tab.data.map((task: any) => (
                      <Grid item xs={12} sm={6} md={4} key={task.id}>
                        {renderTaskCard(task)}
                      </Grid>
                    ))}
                  </Grid>
                );
              })()}
            </TabPanel>
          ))}
        </Stack>

        {/* Dialog de rejet */}
        <Dialog
          open={rejectDialogOpen}
          onClose={() => setRejectDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{t('tasks.administration.reject_dialog.title')}</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {t('tasks.administration.reject_dialog.reason_label')}
            </Typography>
            <TextField
              autoFocus
              multiline
              rows={4}
              fullWidth
              label={t('tasks.administration.reject_dialog.reason_label')}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder={t('tasks.administration.reject_dialog.reason_placeholder')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setRejectDialogOpen(false)}>
              {t('tasks.administration.reject_dialog.cancel')}
            </Button>
            <Button
              onClick={handleConfirmReject}
              variant="gradient"
              color="error"
              disabled={!rejectReason.trim() || rejecting}
            >
              {rejecting
                ? t('tasks.administration.reject_dialog.confirm')
                : t('tasks.administration.reject_dialog.confirm')}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </StyledPage>
  );
}
