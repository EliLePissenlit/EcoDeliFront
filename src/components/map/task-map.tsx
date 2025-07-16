import { useMemo, useState } from 'react';
import { Map, Layer, Source } from 'react-map-gl';

import { Box, Card, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';
import { MAPBOX_API } from 'src/config-global';

import MapMarker from './map-marker';
import MapControl from './map-control';

// ----------------------------------------------------------------------

interface TaskMapProps {
  task: {
    type: 'SERVICE' | 'SHIPPING';
    address: {
      lat: number;
      lng: number;
      fullAddress: string;
    };
    shipping?: {
      pickupAddress?: {
        lat: number;
        lng: number;
        fullAddress: string;
      } | null;
      deliveryAddress?: {
        lat: number;
        lng: number;
        fullAddress: string;
      } | null;
    } | null;
  };
  height?: number;
}

// ----------------------------------------------------------------------

export default function TaskMap({ task, height = 250 }: TaskMapProps) {
  const [viewState, setViewState] = useState({
    longitude: task.address.lng,
    latitude: task.address.lat,
    zoom: 12,
  });

  const { t } = useTranslate();

  // Calculer les bounds pour centrer la carte
  const bounds = useMemo(() => {
    if (task.type === 'SERVICE') {
      // Pour les services, centrer sur l'adresse unique
      return {
        longitude: task.address.lng,
        latitude: task.address.lat,
        zoom: 14,
      };
    }
    // Pour les livraisons, calculer les bounds pour inclure pickup et delivery
    if (task.shipping?.pickupAddress && task.shipping?.deliveryAddress) {
      const lats = [task.shipping.pickupAddress.lat, task.shipping.deliveryAddress.lat];
      const lngs = [task.shipping.pickupAddress.lng, task.shipping.deliveryAddress.lng];

      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);

      const centerLng = (minLng + maxLng) / 2;
      const centerLat = (minLat + maxLat) / 2;

      // Calculer le zoom basé sur la distance
      const latDiff = maxLat - minLat;
      const lngDiff = maxLng - minLng;
      const maxDiff = Math.max(latDiff, lngDiff);

      let zoom = 12;
      if (maxDiff > 0.1) zoom = 10;
      else if (maxDiff > 0.05) zoom = 11;
      else if (maxDiff > 0.01) zoom = 12;
      else if (maxDiff > 0.005) zoom = 13;
      else zoom = 14;

      return {
        longitude: centerLng,
        latitude: centerLat,
        zoom,
      };
    }

    // Fallback sur l'adresse principale
    return {
      longitude: task.address.lng,
      latitude: task.address.lat,
      zoom: 12,
    };
  }, [task]);

  // Mettre à jour le viewState avec les bounds calculés
  useState(() => {
    setViewState(bounds);
  });

  // Générer l'itinéraire pour les livraisons
  const routeSource = useMemo(() => {
    if (
      task.type === 'SHIPPING' &&
      task.shipping?.pickupAddress &&
      task.shipping?.deliveryAddress
    ) {
      const pickup = task.shipping.pickupAddress;
      const delivery = task.shipping.deliveryAddress;

      return {
        type: 'Feature' as const,
        properties: {},
        geometry: {
          type: 'LineString' as const,
          coordinates: [
            [pickup.lng, pickup.lat],
            [delivery.lng, delivery.lat],
          ],
        },
      };
    }
    return null;
  }, [task]);

  return (
    <Card sx={{ overflow: 'hidden' }}>
      <Box sx={{ height, position: 'relative' }}>
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={MAPBOX_API}
          style={{ width: '100%', height: '100%' }}
        >
          <MapControl hideGeolocateControl hideFullscreenControl />

          {/* Point pour les services ou adresse principale */}
          <MapMarker
            longitude={task.address.lng}
            latitude={task.address.lat}
            anchor="bottom"
            color={task.type === 'SERVICE' ? 'primary' : 'primary'}
          />

          {/* Points pour les livraisons */}
          {task.type === 'SHIPPING' && task.shipping?.pickupAddress && (
            <MapMarker
              longitude={task.shipping.pickupAddress.lng}
              latitude={task.shipping.pickupAddress.lat}
              anchor="bottom"
              color="success"
            />
          )}

          {task.type === 'SHIPPING' && task.shipping?.deliveryAddress && (
            <MapMarker
              longitude={task.shipping.deliveryAddress.lng}
              latitude={task.shipping.deliveryAddress.lat}
              anchor="bottom"
              color="error"
            />
          )}

          {/* Itinéraire pour les livraisons */}
          {routeSource && (
            <Source id="route" type="geojson" data={routeSource}>
              <Layer
                id="route-line"
                type="line"
                paint={{
                  'line-color': '#3b82f6',
                  'line-width': 3,
                  'line-dasharray': [2, 2],
                }}
              />
            </Source>
          )}
        </Map>

        {/* Légende */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            bgcolor: 'background.paper',
            borderRadius: 1,
            p: 1,
            boxShadow: 2,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {task.type === 'SERVICE'
              ? t('tasks.detail.service_location')
              : t('tasks.detail.shipping_route')}
          </Typography>
          {task.type === 'SHIPPING' && (
            <Box sx={{ mt: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
                <Typography variant="caption" color="text.secondary">
                  Départ
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'error.main' }} />
                <Typography variant="caption" color="text.secondary">
                  Arrivée
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  );
}
