import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Box, Stack, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';

import RHFLocation from 'src/components/hook-form/rhf-location';

import { LocationType } from 'src/types/graphql/typeDefs';

interface TaskAddressFormProps {
  formData: any;
  isValid: boolean;
}

export default function TaskAddressForm({ formData, isValid }: TaskAddressFormProps) {
  const { t } = useTranslate();
  const { control, setValue } = useFormContext();

  const handleAddressSelect = (fieldName: string) => (place: any) => {
    const addressData = {
      mainText: place.formatted_address.split(',')[0] || '',
      secondaryText: place.formatted_address || '',
      fullAddress: place.formatted_address || '',
      lat: place.geometry?.location?.lat() || 0,
      lng: place.geometry?.location?.lng() || 0,
      placeId: place.place_id || '',
      locationType: LocationType.GpsLocation,
    };

    setValue(fieldName, addressData);
  };

  if (formData.type === 'SERVICE') {
    return (
      <Stack spacing={3}>
        <Typography variant="h6">{t('tasks.form.address.title')}</Typography>

        <Box>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <RHFLocation
                label={t('tasks.form.address.service_address_label')}
                onSelect={handleAddressSelect('address')}
                required
              />
            )}
          />
        </Box>
      </Stack>
    );
  }

  // SHIPPING : n'affiche que le champ pickupAddress
  return (
    <Stack spacing={3}>
      <Typography variant="h6">{t('tasks.form.address.title')}</Typography>
      <Box>
        <Controller
          name="pickupAddress"
          control={control}
          render={({ field }) => (
            <RHFLocation
              label={t('tasks.form.address.pickup_address_label')}
              onSelect={handleAddressSelect('pickupAddress')}
              required
            />
          )}
        />
      </Box>
    </Stack>
  );
}
