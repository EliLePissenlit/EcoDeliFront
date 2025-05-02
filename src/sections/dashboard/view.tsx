import { useState, useEffect } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';

import MyLocationIcon from '@mui/icons-material/MyLocation';
import {
  Box,
  Card,
  Stack,
  Button,
  Dialog,
  Avatar,
  Container,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { localStorageGetItem } from 'src/utils/storage-available';

import { useTranslate } from 'src/locales';

import {
  useGetMyApplicationsQuery,
  useMarkAnIntermediaryStepForATaskMutation,
} from 'src/types/graphql/typeDefs';

import LocationSetupDialog from './components/location-setup-dialog';
import UnifiedDashboardCarousel from './components/unified-dashboard-carousel';

export default function DashboardView() {
  const [openLocationDialog, setOpenLocationDialog] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a défini sa position aujourd'hui
    const lastPositionDate = localStorageGetItem('lastPositionDate', '');
    const today = new Date().toDateString();

    if (lastPositionDate !== today) {
      setOpenLocationDialog(true);
    }
  }, []);

  const handleConfirmLocation = (location: any) => {
    // Marquer la date de définition de position
    localStorage.setItem('lastPositionDate', new Date().toDateString());
    setOpenLocationDialog(false);
  };

  const handleCloseDialog = () => {
    // Optionnel : permettre de fermer sans définir de position
    // localStorage.setItem('hasAlreadySetLastPosition', 'true');
    // setOpenLocationDialog(false);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Carousel unifié */}
      <Box>
        <UnifiedDashboardCarousel />
      </Box>
      {/* Liste des tâches en cours */}
      <Box>
        <ApplicationsInProgressList />
      </Box>

      <LocationSetupDialog
        open={openLocationDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmLocation}
      />
    </Container>
  );
}

// Nouveau composant pour la liste des candidatures en cours
function ApplicationsInProgressList() {
  const { t } = useTranslate();
  const { data, loading, refetch } = useGetMyApplicationsQuery({
    fetchPolicy: 'cache-and-network',
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [markStep, { loading: marking }] = useMarkAnIntermediaryStepForATaskMutation();
  const [error, setError] = useState<string | null>(null);
  const methods = useForm({ defaultValues: { intermediaryStep: null } });
  const { handleSubmit, control, reset } = methods;

  // Filtrer les candidatures en cours
  const applications = data?.getMyApplications || [];
  const inProgressApps = applications.filter(
    (app) =>
      (app.status === 'ACCEPTED' || app.status === 'IN_PROGRESS') &&
      app.startedAt &&
      !app.completedAt
  );

  const handleOpenDialog = (app: any) => {
    setSelectedApp(app);
    setDialogOpen(true);
    setError(null);
    reset({ intermediaryStep: null });
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedApp(null);
    setError(null);
    reset({ intermediaryStep: null });
  };
  const onSubmit = async (values: any) => {
    if (!selectedApp) return;
    try {
      await markStep({
        variables: {
          taskId: selectedApp.task.id,
          intermediaryStep: values.intermediaryStep,
        },
      });
      refetch();
      handleCloseDialog();
    } catch (err: any) {
      setError(err.message || 'Erreur');
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('dashboard.applications_in_progress.title', 'Tâches où je suis intervenant')}
      </Typography>
      {loading && <Typography>{t('common.loading')}</Typography>}
      {!loading && inProgressApps.length === 0 && (
        <Typography color="text.secondary">
          {t('dashboard.applications_in_progress.empty', 'Aucune tâche en cours')}
        </Typography>
      )}
      {!loading && inProgressApps.length > 0 && (
        <Stack spacing={2}>
          {inProgressApps.map((app) => (
            <Card
              key={app.id}
              variant="outlined"
              sx={{ display: 'flex', alignItems: 'center', p: 2 }}
            >
              <Avatar sx={{ mr: 2 }}>{app.task.title?.charAt(0).toUpperCase() || '?'}</Avatar>
              <Box flex={1}>
                <Typography variant="subtitle1">{app.task.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('tasks.status.in_progress', 'En cours')} •{' '}
                  {t('tasks.started_at', 'Démarrée le')}: {app.startedAt}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {app.task.description?.slice(0, 80)}
                  {app.task.description?.length > 80 ? '...' : ''}
                </Typography>
              </Box>
              {app.task.type === 'SHIPPING' && (
                <Button
                  variant="contained"
                  size="small"
                  sx={{ ml: 2 }}
                  onClick={() => handleOpenDialog(app)}
                >
                  {t('dashboard.tasks_in_progress.add_stop', "Ajouter un point d'arrêt")}
                </Button>
              )}
            </Card>
          ))}
        </Stack>
      )}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>
              {t('dashboard.tasks_in_progress.add_stop_title', "Ajouter un point d'arrêt")}
            </DialogTitle>
            <DialogContent>
              <Controller
                name="intermediaryStep"
                control={control}
                render={({ field }) => (
                  <Box>
                    <Button
                      startIcon={<MyLocationIcon />}
                      sx={{ mt: 1 }}
                      onClick={async () => {
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition((pos) => {
                            const { latitude, longitude } = pos.coords;
                            // On remplit le champ avec la position courante (format minimal)
                            field.onChange({
                              lat: latitude,
                              lng: longitude,
                              mainText: t(
                                'dashboard.tasks_in_progress.current_position',
                                'Ma position actuelle'
                              ),
                              secondaryText: '',
                              placeId: '',
                              fullAddress: '',
                              locationType: 'GPS_LOCATION',
                            });
                          });
                        }
                      }}
                      variant="outlined"
                      size="small"
                    >
                      {t(
                        'dashboard.tasks_in_progress.use_current_location',
                        'Utiliser ma position actuelle'
                      )}
                    </Button>
                  </Box>
                )}
              />
              {error && <Typography color="error">{error}</Typography>}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>{t('common.cancel', 'Annuler')}</Button>
              <Button type="submit" variant="contained" disabled={marking}>
                {t('dashboard.tasks_in_progress.confirm_stop', "Valider le point d'arrêt")}
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
    </Box>
  );
}
