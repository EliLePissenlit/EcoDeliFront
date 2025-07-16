/* eslint-disable no-nested-ternary */
import React from 'react';
import { format } from 'date-fns';

import {
  Box,
  Card,
  Chip,
  Stack,
  Avatar,
  Divider,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material';

import { fCurrency } from 'src/utils/format-number';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

import { Task, TaskType, PackageCategory } from 'src/types/graphql/typeDefs';

import TaskStatusBadge from './task-status-badge';

// ----------------------------------------------------------------------

type TaskCardProps = {
  task: Task;
  onViewDetails: (taskId: string) => void;
};

// Composant pour afficher les informations de colis
const PackageInfo = ({
  packageDetails,
  packageCategory,
}: {
  packageDetails: any;
  packageCategory: PackageCategory;
}) => {
  const getCategoryLabel = (category: PackageCategory) => {
    switch (category) {
      case PackageCategory.Small:
        return 'Petit';
      case PackageCategory.Medium:
        return 'Moyen';
      case PackageCategory.Large:
        return 'Grand';
      default:
        return 'Moyen';
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
        return 'warning';
    }
  };

  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Iconify icon="mdi:package-variant" width={16} />
        <Chip
          label={getCategoryLabel(packageCategory)}
          size="small"
          color={getCategoryColor(packageCategory) as any}
          variant="outlined"
        />
      </Stack>
      {packageDetails && (
        <Stack direction="row" spacing={2}>
          {packageDetails.weight && (
            <Typography variant="caption" color="text.secondary">
              {packageDetails.weight}kg
            </Typography>
          )}
          {packageDetails.dimensions && (
            <Typography variant="caption" color="text.secondary">
              {packageDetails.dimensions}
            </Typography>
          )}
        </Stack>
      )}
    </Stack>
  );
};

// Composant pour la timeline de shipping
const ShippingTimeline = ({ shipping }: { shipping: any }) => {
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
      <Stack direction="row" spacing={2} alignItems="center">
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Iconify icon="mdi:map-marker-distance" width={16} />
          <Typography variant="caption" color="text.secondary">
            {formatDistance(shipping.estimatedDistanceInMeters)}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Iconify icon="mdi:clock-outline" width={16} />
          <Typography variant="caption" color="text.secondary">
            {formatDuration(shipping.estimatedDurationInMinutes)}
          </Typography>
        </Stack>
      </Stack>

      {/* Timeline des adresses */}
      <Stack spacing={1}>
        {/* Point de départ */}
        <Stack direction="row" spacing={1} alignItems="flex-start">
          <Box
            sx={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              bgcolor: 'success.main',
              mt: 0.5,
              border: '2px solid #fff',
              minWidth: 14,
              minHeight: 14,
            }}
          />
          <Stack spacing={0.5} sx={{ flex: 1 }}>
            <Typography variant="caption" color="success.main" fontWeight="medium">
              Point de départ
            </Typography>
            <Typography variant="body2" noWrap>
              {shipping.pickupAddress?.fullAddress || (
                <span style={{ color: '#aaa' }}>Non renseigné</span>
              )}
            </Typography>
          </Stack>
        </Stack>

        {/* Ligne de connexion */}
        <Box
          sx={{
            width: 2,
            height: 20,
            bgcolor: 'divider',
            ml: 1.5,
          }}
        />

        {/* Point d'arrivée */}
        <Stack direction="row" spacing={1} alignItems="flex-start">
          <Box
            sx={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              bgcolor: 'error.main',
              mt: 0.5,
              border: '2px solid #fff',
              minWidth: 14,
              minHeight: 14,
            }}
          />
          <Stack spacing={0.5} sx={{ flex: 1 }}>
            <Typography variant="caption" color="error.main" fontWeight="medium">
              Point d&apos;arrivée
            </Typography>
            <Typography variant="body2" noWrap>
              {shipping.deliveryAddress?.fullAddress || (
                <span style={{ color: '#aaa' }}>Non renseigné</span>
              )}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

// Carte pour les tâches de service
const ServiceTaskCard = ({ task, onViewDetails }: TaskCardProps) => {
  const displayName =
    task.user.firstName && task.user.lastName
      ? `${task.user.firstName} ${task.user.lastName}`
      : 'Utilisateur';

  const { fullAddress } = task.address;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
      onClick={() => onViewDetails(task.id)}
    >
      {/* Image de la tâche si disponible */}
      {task.fileUrl && (
        <Box
          sx={{
            height: 160,
            backgroundImage: `url(${task.fileUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={2}>
          {/* En-tête avec statut et propriétaire */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                src={task.user.avatar || undefined}
                alt={displayName}
                sx={{ width: 32, height: 32 }}
              />
              <Typography variant="body2" color="text.secondary">
                {displayName}
              </Typography>
            </Stack>
            <TaskStatusBadge status={task.status} />
          </Stack>

          {/* Catégorie */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Catégorie:
            </Typography>
            {task.category && (
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1,
                  backgroundColor: task.category.color || 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
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
                  <Typography variant="caption" color="white">
                    {task.category.name.charAt(0).toUpperCase()}
                  </Typography>
                )}
              </Box>
            )}
            <Typography
              variant="body2"
              sx={{
                color: task.category?.color,
                fontWeight: 'medium',
              }}
            >
              {task.category?.name}
            </Typography>
          </Stack>

          {/* Durée réelle */}
          {task.estimatedDuration && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Iconify icon="mdi:clock-outline" width={16} />
              <Typography variant="body2" color="text.secondary">
                Durée: {task.estimatedDuration} heure(s)
              </Typography>
            </Stack>
          )}

          {/* Localisation */}
          <Stack spacing={0.5}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              <Iconify icon="mdi:map-marker" width={18} sx={{ mr: 0.5 }} />
              Localisation
            </Typography>
            <Typography variant="body2" noWrap>
              {fullAddress}
            </Typography>
          </Stack>

          {/* Statistiques */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              {task.applications?.length} candidature
              {task.applications?.length > 1 ? 's' : ''}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              créé le {format(new Date(task.createdAt), 'dd/MM/yyyy')}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>

      <Divider />

      <CardActions sx={{ p: 2, pt: 1.5 }}>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ width: '100%' }}>
          {/* Prix */}
          <Typography variant="h6" fontWeight="bold">
            {task.calculatedPriceInCents
              ? fCurrency(task.calculatedPriceInCents / 100)
              : 'Prix en fin de course'}
          </Typography>
        </Stack>
      </CardActions>
    </Card>
  );
};

// Carte pour les tâches de shipping
const ShippingTaskCard = ({ task, onViewDetails }: TaskCardProps) => {
  const displayName =
    task.user.firstName && task.user.lastName
      ? `${task.user.firstName} ${task.user.lastName}`
      : 'Utilisateur';

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
      onClick={() => onViewDetails(task.id)}
    >
      {/* Image de la tâche si disponible */}
      {task.fileUrl && (
        <Box
          sx={{
            height: 160,
            backgroundImage: `url(${task.fileUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={2}>
          {/* En-tête avec statut et propriétaire */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                src={task.user.avatar || undefined}
                alt={displayName}
                sx={{ width: 32, height: 32 }}
              />
              <Typography variant="body2" color="text.secondary">
                {displayName}
              </Typography>
            </Stack>
            <TaskStatusBadge status={task.status} />
          </Stack>

          {/* Catégorie */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Catégorie:
            </Typography>
            {task.category && (
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1,
                  backgroundColor: task.category.color || 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
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
                  <Typography variant="caption" color="white">
                    {task.category.name.charAt(0).toUpperCase()}
                  </Typography>
                )}
              </Box>
            )}
            <Typography
              variant="body2"
              sx={{
                color: task.category?.color,
                fontWeight: 'medium',
              }}
            >
              {task.category?.name}
            </Typography>
          </Stack>

          {/* Informations du colis */}
          {task.shipping && (
            <PackageInfo
              packageDetails={task.shipping.packageDetails}
              packageCategory={task.shipping.packageCategory}
            />
          )}

          {/* Timeline de shipping */}
          {task.shipping && <ShippingTimeline shipping={task.shipping} />}

          {/* Statistiques */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              {task.applications?.length} candidature
              {task.applications?.length > 1 ? 's' : ''}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              créé le {format(new Date(task.createdAt), 'dd/MM/yyyy')}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>

      <Divider />

      <CardActions sx={{ p: 2, pt: 1.5 }}>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ width: '100%' }}>
          {/* Prix - utiliser le prix du shipping si disponible */}
          <Typography variant="h6" fontWeight="bold">
            {task.shipping?.calculatedPriceInCents
              ? fCurrency(task.shipping.calculatedPriceInCents / 100)
              : task.calculatedPriceInCents
                ? fCurrency(task.calculatedPriceInCents / 100)
                : 'Prix en fin de course'}
          </Typography>
        </Stack>
      </CardActions>
    </Card>
  );
};

// Composant principal qui choisit le bon style selon le type
export default function TaskCard(props: TaskCardProps) {
  const { task } = props;

  if (task.type === TaskType.Shipping) {
    return <ShippingTaskCard {...props} />;
  }

  return <ServiceTaskCard {...props} />;
}
