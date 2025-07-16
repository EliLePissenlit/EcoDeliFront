import { useState, useCallback } from 'react';

import { LocationType, useSaveLastPositionMutation } from 'src/types/graphql/typeDefs';

interface GeolocationResult {
  success: boolean;
  address?: string;
  coordinates?: { lat: number; lng: number };
  error?: any;
}

export const useGeolocation = () => {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [saveLastPosition] = useSaveLastPositionMutation();

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const getCurrentLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par votre navigateur");
      return undefined;
    }

    setIsGettingLocation(true);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        });
      });

      const { latitude, longitude } = position.coords;

      // Utiliser l'API Google Geocoding pour obtenir l'adresse réelle
      const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}&language=fr&region=fr`;

      const response = await fetch(geocodingUrl);
      const data = await response.json();

      if (data.status === 'OK' && data.results && data.results.length > 0) {
        const place = data.results[0];

        // Créer l'objet AddressInput avec l'adresse réelle de Google
        const addressInput = {
          mainText: place.formatted_address.split(',')[0] || 'Position actuelle',
          secondaryText: place.formatted_address,
          lat: latitude,
          lng: longitude,
          placeId: place.place_id,
          fullAddress: place.formatted_address,
          locationType: LocationType.GpsLocation,
        };

        // Sauvegarder la position avec l'adresse réelle
        await saveLastPosition({
          variables: {
            input: addressInput,
          },
        });

        const result: GeolocationResult = {
          success: true,
          address: place.formatted_address,
          coordinates: { lat: latitude, lng: longitude },
        };
        return result;
      }

      // Fallback si aucune adresse n'est trouvée
      const addressInput = {
        mainText: 'Position actuelle',
        secondaryText: 'Position GPS',
        lat: latitude,
        lng: longitude,
        placeId: `gps_${latitude}_${longitude}`,
        fullAddress: `Position GPS: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
        locationType: LocationType.GpsLocation,
      };

      await saveLastPosition({
        variables: {
          input: addressInput,
        },
      });

      const result: GeolocationResult = {
        success: true,
        address: `Position GPS: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
        coordinates: { lat: latitude, lng: longitude },
      };
      return result;
    } catch (error) {
      console.error('Erreur lors de la récupération de la position:', error);
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert('Permission de géolocalisation refusée');
            break;
          case error.POSITION_UNAVAILABLE:
            alert('Position indisponible');
            break;
          case error.TIMEOUT:
            alert("Délai d'attente dépassé pour la géolocalisation");
            break;
          default:
            alert('Erreur lors de la géolocalisation');
        }
      } else {
        alert('Erreur lors de la récupération de la position');
      }
      const result: GeolocationResult = { success: false, error };
      return result;
    } finally {
      setIsGettingLocation(false);
    }
  }, [saveLastPosition, apiKey]);

  return {
    getCurrentLocation,
    isGettingLocation,
  };
};
