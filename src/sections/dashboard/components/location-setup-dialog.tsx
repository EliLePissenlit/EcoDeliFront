import { useState, useEffect } from 'react';

import {
  Box,
  Alert,
  Dialog,
  Button,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import RHFLocation from 'src/components/hook-form/rhf-location';

interface LocationSetupDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (location: any) => void;
}

export default function LocationSetupDialog({
  open,
  onClose,
  onConfirm,
}: LocationSetupDialogProps) {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const handleLocationSelect = (place: any) => {
    setSelectedLocation(place);
  };

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      onConfirm(selectedLocation);
    }
  };

  // Reset selected location when dialog opens
  useEffect(() => {
    if (open) {
      setSelectedLocation(null);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth disableEscapeKeyDown>
      <DialogTitle>
        <Typography variant="h6" component="div">
          Configuration de votre position
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Pour utiliser Ecodeli, nous avons besoin de votre position afin de vous proposer les
            trajets à réaliser les plus proches ainsi que les points relais.
          </Typography>

          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">Cette information nous permet de :</Typography>
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              <li>Trouver les missions les plus proches de chez vous</li>
              <li>Identifier les points relais à proximité</li>
              <li>Optimiser vos trajets et réduire vos déplacements</li>
              <li>Améliorer la précision de nos recommandations</li>
            </ul>
          </Alert>
        </Box>

        <RHFLocation label="Votre adresse" onSelect={handleLocationSelect} required />
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0, mt: 2 }}>
        <Button
          onClick={handleConfirmLocation}
          variant="gradient"
          disabled={!selectedLocation}
          size="large"
        >
          Confirmer ma position
        </Button>
      </DialogActions>
    </Dialog>
  );
}
