import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import React, { useMemo, useState } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import {
  Box,
  Card,
  Step,
  Grid,
  Stack,
  Alert,
  Button,
  Stepper,
  StepLabel,
  Container,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';

import { useTranslate } from 'src/locales';

import StyledPage from 'src/components/styled-page';
import FormProvider from 'src/components/hook-form/form-provider';
import GenericStripePayment from 'src/components/payment/generic-stripe-payment';

import TaskSummary from 'src/sections/tasks/components/TaskSummary';
import TaskReviewForm from 'src/sections/tasks/components/TaskReviewForm';
import TaskServiceForm from 'src/sections/tasks/components/TaskServiceForm';
import TaskAddressForm from 'src/sections/tasks/components/TaskAddressForm';
import TaskShippingForm from 'src/sections/tasks/components/TaskShippingForm';
import TaskBasicInfoForm from 'src/sections/tasks/components/TaskBasicInfoForm';

import {
  TaskType,
  LocationType,
  PackageCategory,
  useRelayPointsQuery,
  useCreateTaskMutation,
  useGetCategoriesQuery,
  useCreateCustomPaymentMutation,
  useCalculatePriceRangeFromGeoDataLazyQuery,
} from 'src/types/graphql/typeDefs';

// Pour éviter l'erreur TS sur window.__lastShippingKey
declare global {
  interface Window {
    __lastShippingKey?: string;
  }
}

export default function TaskCreatePage() {
  const { t } = useTranslate();
  const navigate = useNavigate();

  const steps = [
    t('tasks.create.steps.basic_info'),
    t('tasks.create.steps.task_type'),
    t('tasks.create.steps.address'),
    t('tasks.create.steps.review'),
  ];

  // État du formulaire avec React Hook Form
  const methods = useForm({
    defaultValues: {
      type: TaskType.Service,
      title: '',
      description: '',
      categoryId: '',
      estimatedDuration: null,
      packageCategory: PackageCategory.Small,
      file: null,
      pickupAddress: {
        mainText: '',
        secondaryText: '',
        fullAddress: '',
        lat: 0,
        lng: 0,
        placeId: '',
        locationType: LocationType.GpsLocation,
      },
      deliveryAddress: {
        mainText: '',
        secondaryText: '',
        fullAddress: '',
        lat: 0,
        lng: 0,
        placeId: '',
        locationType: LocationType.GpsLocation,
      },
      packageDetails: {
        weight: null,
        length: null,
        width: null,
        height: null,
      },
      address: {
        mainText: '',
        secondaryText: '',
        fullAddress: '',
        lat: 0,
        lng: 0,
        placeId: '',
        locationType: LocationType.GpsLocation,
      },
      relayPointId: '',
    },
  });

  const [activeStep, setActiveStep] = useState(0);
  const { watch, handleSubmit } = methods;
  const formData = watch();

  // Ajout des états pour le paiement
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentValidated, setPaymentValidated] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [stripePromise] = useState(() => loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY));

  // Mutation pour créer le paiement custom
  const [createCustomPayment, { loading: paymentLoading }] = useCreateCustomPaymentMutation();

  // Hook Apollo pour le calcul du prix estimé
  const [calculatePrice, { data: priceData }] = useCalculatePriceRangeFromGeoDataLazyQuery();
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  // Récupération des catégories
  const { data: categoriesData, loading: loadingCategories } = useGetCategoriesQuery();
  const categories = useMemo(
    () =>
      (categoriesData?.getCategories || []).map((cat) => ({
        ...cat,
        color: cat.color || '#BDBDBD',
      })),
    [categoriesData]
  );

  // Puis seulement après, le useEffect qui utilise categories
  React.useEffect(() => {
    // SERVICE : calcul simple
    if (formData.type === TaskType.Service) {
      const selectedCategory = categories.find((cat) => cat.id === formData.categoryId);
      const durationInMinutes = formData.estimatedDuration || 0;
      if (selectedCategory && durationInMinutes > 0) {
        const durationInHours = durationInMinutes / 60;
        const newPrice = Math.round(selectedCategory.amountInCents * durationInHours);
        setEstimatedPrice((prev) => (prev !== newPrice ? newPrice : prev));
      } else {
        setEstimatedPrice(null);
      }
      return;
    }
    // SHIPPING : calcul dynamique uniquement si toutes les valeurs sont présentes
    if (
      formData.type === TaskType.Shipping &&
      formData.pickupAddress?.lat &&
      formData.pickupAddress?.lng &&
      formData.relayPointId &&
      formData.packageCategory
    ) {
      // On évite de recalculer si les valeurs n'ont pas changé
      const key = `${formData.pickupAddress.lat}-${formData.pickupAddress.lng}-${formData.relayPointId}-${formData.packageCategory}`;
      if (window.__lastShippingKey === key) return;
      window.__lastShippingKey = key;
      calculatePrice({
        variables: {
          input: {
            start: {
              lat: formData.pickupAddress.lat,
              lon: formData.pickupAddress.lng,
            },
            relayPointId: formData.relayPointId,
            packageCategory: formData.packageCategory,
          },
        },
      });
    }
  }, [formData, categories, calculatePrice]);

  React.useEffect(() => {
    if (priceData?.calculatePriceRangeFromGeoData?.minPriceInCents) {
      setEstimatedPrice(priceData.calculatePriceRangeFromGeoData.minPriceInCents);
    }
  }, [priceData]);

  // Handler pour lancer le paiement
  const handleOpenPaymentDialog = async () => {
    // Appelle la mutation pour obtenir le clientSecret
    try {
      if (!estimatedPrice) return;
      const { data } = await createCustomPayment({
        variables: {
          input: {
            amount: estimatedPrice,
            currency: 'eur',
          },
        },
      });
      setClientSecret(data?.createCustomPayment.clientSecret || null);
      setPaymentDialogOpen(true);
    } catch (err) {
      // Gérer l'erreur (snackbar, etc.)
    }
  };

  // Handler de succès du paiement
  const handlePaymentSuccess = () => {
    setPaymentValidated(true);
    setPaymentDialogOpen(false);
  };

  // Récupération des points relais
  const { data: relayPointsData, loading: loadingRelayPoints } = useRelayPointsQuery();
  const relayPoints = relayPointsData?.relayPoints || [];

  // Mutation de création
  const [createTask, { loading: creating, error }] = useCreateTaskMutation({
    onCompleted: (data) => {
      navigate(`/tasks/${data.createTask.id}`);
    },
  });

  // Validation des étapes
  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 0: // Informations de base
        return formData.title.trim() !== '' && formData.description.trim() !== '';
      case 1: // Type de tâche
        if (formData.type === TaskType.Service) {
          return formData.categoryId !== '' && (formData.estimatedDuration || 0) > 0;
        }
        return formData.packageCategory !== undefined;
      case 2: // Adresse
        if (formData.type === TaskType.Service) {
          return formData.address.fullAddress.trim() !== '';
        }
        return (
          formData.pickupAddress.fullAddress.trim() !== '' && formData.relayPointId.trim() !== ''
        );
      default:
        return true;
    }
  };

  // Handlers
  const handleNext = () => {
    if (isStepValid(activeStep)) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onSubmit = async (data: any) => {
    try {
      const input = {
        type: data.type,
        title: data.title,
        description: data.description,
        address: data.address,
        file: data.file,
        ...(data.type === TaskType.Service && {
          categoryId: data.categoryId,
          estimatedDuration: data.estimatedDuration,
        }),
        ...(data.type === TaskType.Shipping && {
          categoryId: data.categoryId,
          packageCategory: data.packageCategory,
          pickupAddress: data.pickupAddress, // <-- champ libre
          relayPointId: data.relayPointId, // <-- id du point relais d'arrivée
          packageDetails: data.packageDetails,
        }),
      };
      await createTask({ variables: { input } });
    } catch (err) {
      console.error('Erreur lors de la création de la tâche:', err);
    }
  };

  // Rendu des étapes
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <TaskBasicInfoForm formData={formData} isValid={isStepValid(step)} />;
      case 1:
        return (
          <Stack spacing={3}>
            {formData.type === TaskType.Service ? (
              <TaskServiceForm
                formData={formData}
                categories={categories}
                isValid={isStepValid(step)}
              />
            ) : (
              <TaskShippingForm
                formData={formData}
                categories={categories}
                isValid={isStepValid(step)}
              />
            )}
          </Stack>
        );
      case 2:
        if (formData.type === TaskType.Service) {
          return <TaskAddressForm formData={formData} isValid={isStepValid(step)} />;
        }
        // SHIPPING : Saisie libre pour le départ, autocomplete pour le point relais d'arrivée
        return (
          <Stack spacing={2}>
            {/* Pickup address : champ libre */}
            <TaskAddressForm formData={formData} isValid={isStepValid(step)} />
            {/* Arrival : autocomplete point relais */}
            {loadingRelayPoints ? (
              <CircularProgress />
            ) : (
              <Autocomplete
                options={relayPoints}
                getOptionLabel={(option) => `${option.name} – ${option.address?.fullAddress || ''}`}
                value={relayPoints.find((rp) => rp.id === formData.relayPointId) || null}
                onChange={(_, newValue) => {
                  methods.setValue('relayPointId', newValue ? newValue.id : '');
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Point relais d'arrivée" required fullWidth />
                )}
                isOptionEqualToValue={(option, value) =>
                  !!option && !!value && option.id === value.id
                }
              />
            )}
          </Stack>
        );
      case 3:
        return (
          <TaskReviewForm
            formData={formData}
            categories={categories}
            onSubmit={handleSubmit(onSubmit)}
            loading={creating}
          />
        );
      default:
        return null;
    }
  };

  if (loadingCategories) {
    return (
      <StyledPage title={t('tasks.create.title')}>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
            <CircularProgress size={60} />
          </Box>
        </Container>
      </StyledPage>
    );
  }

  return (
    <StyledPage title={t('tasks.create.title')}>
      <Container maxWidth="lg">
        <FormProvider methods={methods}>
          <Stack spacing={4}>
            {/* En-tête */}
            <Box textAlign="center">
              <Typography variant="h4" gutterBottom>
                {t('tasks.create.title')}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t('tasks.create.subtitle')}
              </Typography>
            </Box>

            {/* Stepper */}
            <Box>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            {/* Contenu principal en deux colonnes */}
            <Grid container spacing={4}>
              {/* Formulaire à gauche */}
              <Grid item xs={12} md={8}>
                <Card sx={{ p: 3 }}>
                  {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                      {t('common.error')}
                    </Alert>
                  )}

                  {renderStepContent(activeStep)}

                  {/* Navigation */}
                  <Stack direction="row" justifyContent="space-between" sx={{ mt: 4 }}>
                    <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
                      {t('common.back')}
                    </Button>

                    {activeStep === steps.length - 1 ? (
                      <>
                        {(() => {
                          let buttonText = 'Payer et créer la tâche';
                          if (paymentValidated && creating) buttonText = t('common.creating');
                          else if (paymentValidated) buttonText = t('tasks.create.submit');
                          return (
                            <Button
                              variant="gradient"
                              onClick={() => {
                                if (!paymentValidated) {
                                  handleOpenPaymentDialog();
                                } else {
                                  handleSubmit(onSubmit)();
                                }
                              }}
                              disabled={
                                creating ||
                                !isStepValid(activeStep) ||
                                paymentLoading ||
                                !estimatedPrice
                              }
                              startIcon={creating && <CircularProgress size={20} />}
                            >
                              {buttonText}
                            </Button>
                          );
                        })()}
                        <GenericStripePayment
                          open={paymentDialogOpen}
                          onClose={() => setPaymentDialogOpen(false)}
                          onSuccess={handlePaymentSuccess}
                          clientSecret={clientSecret || ''}
                          stripePromise={stripePromise}
                          returnUrl={window.location.href}
                          buttonText={t('payment.pay')}
                          isDialog
                          title={t('payment.title')}
                        />
                      </>
                    ) : (
                      <Button
                        variant="gradient"
                        onClick={handleNext}
                        disabled={!isStepValid(activeStep)}
                      >
                        {t('common.next')}
                      </Button>
                    )}
                  </Stack>
                </Card>
              </Grid>

              {/* Récapitulatif à droite */}
              <Grid item xs={12} md={4}>
                <TaskSummary formData={formData} categories={categories} />
              </Grid>
            </Grid>
          </Stack>
        </FormProvider>
      </Container>
    </StyledPage>
  );
}
