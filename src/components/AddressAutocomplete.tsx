import React, { useCallback, useMemo, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

interface SimpleAddressAutocompleteProps {
  label?: string;
  onSelect: (place: any) => void;
  required?: boolean;
}

const SimpleAddressAutocomplete: React.FC<SimpleAddressAutocompleteProps> = ({
  label = 'Adresse',
  onSelect,
  required = false,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { placePredictions, getPlacePredictions, placesService } = usePlacesService({
    apiKey,
    options: { input: '', types: ['address'], componentRestrictions: { country: 'fr' } },
  });

  // Suggestions formatées pour MUI Autocomplete
  const options = useMemo(() => placePredictions || [], [placePredictions]);

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
        <TextField {...params} label={label} required={required} variant="outlined" fullWidth />
      )}
      noOptionsText="Aucune adresse"
    />
  );
};

export default SimpleAddressAutocomplete;
