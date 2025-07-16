import React, { useMemo, useState, useCallback } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

import { Button, Tooltip, TextField, Autocomplete } from '@mui/material';

import Iconify from 'src/components/iconify';

import { LocationType, useSaveLastPositionMutation } from 'src/types/graphql/typeDefs';

interface SimpleAddressAutocompleteProps {
  label?: string;
  onSelect: (place: any) => void;
  required?: boolean;
}

const RHFLocation: React.FC<SimpleAddressAutocompleteProps> = ({
  label = 'Adresse',
  onSelect,
  required = false,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const [saveLastPosition] = useSaveLastPositionMutation();

  const { placePredictions, getPlacePredictions, placesService } = usePlacesService({
    apiKey,
    options: { input: '', types: ['address'], componentRestrictions: { country: 'fr' } },
  });

  // Suggestions formatées pour MUI Autocomplete
  const options = useMemo(() => placePredictions || [], [placePredictions]);

  // Fonction pour récupérer la position GPS et sauvegarder
  const handleGetCurrentLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par votre navigateur");
      return;
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

        // Créer un objet place formaté pour onSelect
        const formattedPlace = {
          name: place.formatted_address,
          formatted_address: place.formatted_address,
          geometry: {
            location: {
              lat: () => latitude,
              lng: () => longitude,
            },
          },
          place_id: place.place_id,
        };

        // Mettre à jour le champ avec l'adresse réelle
        setInputValue(place.formatted_address);
        onSelect(formattedPlace);
      } else {
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

        const formattedPlace = {
          name: 'Position GPS',
          formatted_address: `Position GPS: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          geometry: {
            location: {
              lat: () => latitude,
              lng: () => longitude,
            },
          },
          place_id: `gps_${latitude}_${longitude}`,
        };

        setInputValue(`Position GPS: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        onSelect(formattedPlace);
      }
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
    } finally {
      setIsGettingLocation(false);
    }
  }, [saveLastPosition, onSelect, apiKey]);

  // Quand l'utilisateur tape dans le champ
  const handleInputChange = useCallback(
    (_: any, value: string) => {
      setInputValue(value);
      if (value) {
        getPlacePredictions({ input: value });
      }
    },
    [getPlacePredictions]
  );

  // Quand l'utilisateur sélectionne une suggestion
  const handleChange = useCallback(
    (_: any, value: any) => {
      if (!value) return;
      // On récupère les détails du lieu sélectionné
      placesService?.getDetails(
        { placeId: value.place_id, fields: ['formatted_address', 'geometry', 'place_id'] },
        (place: any, status: string) => {
          if (status === 'OK') {
            onSelect(place);
            console.log('Place ID sélectionné:', place.place_id);
          }
        }
      );
    },
    [onSelect, placesService]
  );

  return (
    <Autocomplete
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={options}
      getOptionLabel={(option: any) => option.description || ''}
      filterOptions={(x) => x} // Pas de filtrage côté client
      onInputChange={handleInputChange}
      onChange={handleChange}
      inputValue={inputValue}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required={required}
          variant="outlined"
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {params.InputProps.endAdornment}
                <Tooltip title="Utiliser ma position actuelle">
                  <Button
                    size="small"
                    variant="text"
                    onClick={handleGetCurrentLocation}
                    disabled={isGettingLocation}
                    sx={{
                      minWidth: 'auto',
                      p: 0.5,
                      mr: 0.5,
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <Iconify
                      icon={isGettingLocation ? 'mdi:loading' : 'mdi:crosshairs-gps'}
                      sx={{
                        fontSize: 20,
                        ...(isGettingLocation && {
                          animation: 'spin 1s linear infinite',
                          '@keyframes spin': {
                            '0%': { transform: 'rotate(0deg)' },
                            '100%': { transform: 'rotate(360deg)' },
                          },
                        }),
                      }}
                    />
                  </Button>
                </Tooltip>
              </>
            ),
          }}
        />
      )}
      noOptionsText="Aucune adresse"
    />
  );
};

export default RHFLocation;
