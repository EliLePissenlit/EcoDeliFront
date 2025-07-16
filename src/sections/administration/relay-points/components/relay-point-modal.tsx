import React, { useState, useEffect } from 'react';

import {
  Box,
  Grid,
  Stack,
  Button,
  Dialog,
  Switch,
  Divider,
  TextField,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormControlLabel,
} from '@mui/material';

import { useTranslate } from 'src/locales';

import { UploadBox } from 'src/components/upload';
import { RHFLocation } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type OpeningDay = {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
};

type AddressInput = {
  mainText: string;
  secondaryText: string;
  lat: number;
  lng: number;
  placeId: string;
  fullAddress: string;
  locationType: 'IP_LOCATION' | 'GPS_LOCATION';
};

type AddressWithId = AddressInput & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

type RelayPoint = {
  id: string;
  name: string;
  description: string;
  openingDays: OpeningDay[];
  address?: AddressWithId;
  fileUrl?: string;
};

type RelayPointModalProps = {
  open: boolean;
  relayPoint?: RelayPoint | null;
  onClose: () => void;
  onSave: (formData: any) => void;
};

const DAYS_OF_WEEK = [
  { key: 'monday', label: 'Lundi' },
  { key: 'tuesday', label: 'Mardi' },
  { key: 'wednesday', label: 'Mercredi' },
  { key: 'thursday', label: 'Jeudi' },
  { key: 'friday', label: 'Vendredi' },
  { key: 'saturday', label: 'Samedi' },
  { key: 'sunday', label: 'Dimanche' },
];

export default function RelayPointModal({
  open,
  relayPoint,
  onClose,
  onSave,
}: RelayPointModalProps) {
  const { t } = useTranslate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [existingImageUrl, setExistingImageUrl] = useState<string>('');
  const [openingDays, setOpeningDays] = useState<OpeningDay[]>(
    DAYS_OF_WEEK.map((day) => ({
      day: day.key,
      open: '09:00',
      close: '18:00',
      isOpen: true,
    }))
  );
  const [address, setAddress] = useState<AddressInput | null>(null);

  useEffect(() => {
    if (relayPoint) {
      setName(relayPoint.name);
      setDescription(relayPoint.description);
      setOpeningDays(relayPoint.openingDays);
      setAddress(relayPoint.address || null);
      setExistingImageUrl(relayPoint.fileUrl || '');
      setImageFile(null);
      setImagePreview('');
    } else {
      setName('');
      setDescription('');
      setImageFile(null);
      setImagePreview('');
      setExistingImageUrl('');
      setAddress(null);
      setOpeningDays(
        DAYS_OF_WEEK.map((day) => ({
          day: day.key,
          open: '09:00',
          close: '18:00',
          isOpen: true,
        }))
      );
    }
  }, [relayPoint, open]);

  const handleSave = () => {
    // Préparation des données d'adresse pour l'envoi au backend
    let addressData = null;
    if (address) {
      if ('id' in address) {
        // Mode édition : on envoie seulement l'ID et les données de base
        addressData = {
          mainText: address.mainText,
          secondaryText: address.secondaryText,
          lat: address.lat,
          lng: address.lng,
          placeId: address.placeId,
          fullAddress: address.fullAddress,
          locationType: address.locationType,
        };
      } else {
        // Mode création : on envoie toutes les données sauf createdAt/updatedAt
        addressData = address;
      }
    }

    const formData = {
      name,
      description,
      openingDays,
      address: addressData,
      ...(imageFile && { file: imageFile }),
    };
    onSave(formData);
  };

  const handleImageUpload = (files: File[]) => {
    if (files.length > 0) {
      setImageFile(files[0]);
      // Effacer l'URL de l'image existante quand une nouvelle image est uploadée
      setExistingImageUrl('');
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    setExistingImageUrl('');
  };

  const handleDayToggle = (dayKey: string) => {
    setOpeningDays((prev) =>
      prev.map((day) => (day.day === dayKey ? { ...day, isOpen: !day.isOpen } : day))
    );
  };

  const handleTimeChange = (dayKey: string, field: 'open' | 'close', value: string) => {
    setOpeningDays((prev) =>
      prev.map((day) => (day.day === dayKey ? { ...day, [field]: value } : day))
    );
  };

  const handleAddressSelect = (place: any) => {
    const mainText = place.name || '';
    const secondaryText = place.formatted_address || '';

    const lat = place.geometry?.location?.lat() || 0;
    const lng = place.geometry?.location?.lng() || 0;

    // Si on est en mode édition et qu'une adresse existe déjà, on préserve l'ID
    const existingAddress = relayPoint?.address;

    const addressData: AddressInput = {
      mainText,
      secondaryText,
      lat,
      lng,
      placeId: place.place_id,
      fullAddress: place.formatted_address,
      locationType: 'GPS_LOCATION',
    };

    // En mode édition, on préserve seulement l'ID existant
    if (existingAddress) {
      const addressWithId: AddressWithId = {
        ...addressData,
        id: existingAddress.id,
        createdAt: existingAddress.createdAt,
        updatedAt: existingAddress.updatedAt,
      };
      setAddress(addressWithId);
    } else {
      setAddress(addressData);
    }
  };

  const isFormValid = name.trim().length > 0 && description.trim().length > 0 && address !== null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {relayPoint
          ? t('sections.relayPointsAdministration.modal.edit_title')
          : t('sections.relayPointsAdministration.modal.create_title')}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label={t('sections.relayPointsAdministration.modal.name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label={t('sections.relayPointsAdministration.modal.description')}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {t('sections.relayPointsAdministration.modal.address')}
            </Typography>
            <RHFLocation
              label={t('sections.relayPointsAdministration.modal.address_placeholder')}
              onSelect={handleAddressSelect}
              required
            />
            {address && (
              <Box sx={{ mt: 1, p: 2, bgcolor: 'background.neutral', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Adresse sélectionnée :</strong> {address.fullAddress}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Coordonnées : {address.lat.toFixed(6)}, {address.lng.toFixed(6)}
                </Typography>
              </Box>
            )}
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {t('sections.relayPointsAdministration.modal.image')}
            </Typography>
            <UploadBox
              accept={{ 'image/*': [] }}
              maxFiles={1}
              onDrop={handleImageUpload}
              sx={{ width: '100%', height: 120 }}
            />

            {/* Affichage de l'image existante ou de la nouvelle image uploadée */}
            {(existingImageUrl || imagePreview) && (
              <Box sx={{ mt: 1, textAlign: 'center' }}>
                <Box
                  component="img"
                  src={imagePreview || existingImageUrl}
                  alt="Image preview"
                  sx={{ width: 120, height: 120, borderRadius: 1, objectFit: 'cover' }}
                />
                <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 1 }}>
                  {existingImageUrl && !imagePreview && (
                    <Typography variant="caption" color="text.secondary">
                      Image actuelle
                    </Typography>
                  )}
                  {imagePreview && (
                    <Typography variant="caption" color="text.secondary">
                      Nouvelle image
                    </Typography>
                  )}
                  <Button
                    size="small"
                    color="error"
                    onClick={handleRemoveImage}
                    sx={{ minWidth: 'auto', px: 1 }}
                  >
                    Supprimer
                  </Button>
                </Stack>
              </Box>
            )}
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              {t('sections.relayPointsAdministration.modal.opening_hours')}
            </Typography>
            <Stack spacing={2}>
              {DAYS_OF_WEEK.map(({ key, label }) => {
                const day = openingDays.find((d) => d.day === key);
                if (!day) return null;

                return (
                  <Box key={key} sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={3}>
                        <FormControlLabel
                          control={
                            <Switch checked={day.isOpen} onChange={() => handleDayToggle(key)} />
                          }
                          label={label}
                        />
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <TextField
                          type="time"
                          label={t('sections.relayPointsAdministration.modal.open')}
                          value={day.open}
                          onChange={(e) => handleTimeChange(key, 'open', e.target.value)}
                          disabled={!day.isOpen}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <TextField
                          type="time"
                          label={t('sections.relayPointsAdministration.modal.close')}
                          value={day.close}
                          onChange={(e) => handleTimeChange(key, 'close', e.target.value)}
                          disabled={!day.isOpen}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('sections.relayPointsAdministration.modal.cancel')}</Button>
        <Button onClick={handleSave} variant="gradient" color="primary" disabled={!isFormValid}>
          {relayPoint
            ? t('sections.relayPointsAdministration.modal.update')
            : t('sections.relayPointsAdministration.modal.create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
