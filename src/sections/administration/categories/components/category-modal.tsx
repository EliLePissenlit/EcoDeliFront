import React, { useState, useEffect } from 'react';

import {
  Box,
  Stack,
  Button,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { useTranslate } from 'src/locales';

import { UploadBox } from 'src/components/upload';
import { ColorPicker } from 'src/components/color-utils';

// ----------------------------------------------------------------------

type Category = {
  id: string;
  name: string;
  description?: string | null;
  amountInCents?: number | null;
  color?: string | null;
  iconUrl?: string | null;
};

type CategoryModalProps = {
  open: boolean;
  category?: Category | null;
  onClose: () => void;
  onSave: (formData: any) => void;
};

const COLORS = [
  '#00AB55', // green
  '#1890FF', // blue
  '#FFC107', // yellow
  '#FF4842', // red
  '#04297A', // dark blue
  '#7A0C2E', // dark red
  '#FF6B6B', // coral
  '#4ECDC4', // turquoise
  '#45B7D1', // light blue
  '#96CEB4', // mint
  '#FFEAA7', // light yellow
  '#DDA0DD', // plum
  '#98D8C8', // sea green
  '#F7DC6F', // golden yellow
  '#BB8FCE', // lavender
];

export default function CategoryModal({ open, category, onClose, onSave }: CategoryModalProps) {
  const { t } = useTranslate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amountInCents, setAmountInCents] = useState<string>('');
  const [color, setColor] = useState('#00AB55');
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string>('');
  const [existingIconUrl, setExistingIconUrl] = useState<string>('');

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description || '');
      setAmountInCents(category.amountInCents ? (category.amountInCents / 100).toString() : '');
      setColor(category.color || '#00AB55');
      setExistingIconUrl(category.iconUrl || '');
      setIconFile(null);
      setIconPreview('');
    } else {
      setName('');
      setDescription('');
      setAmountInCents('');
      setColor('#00AB55');
      setIconFile(null);
      setIconPreview('');
      setExistingIconUrl('');
    }
  }, [category, open]);

  const handleSave = () => {
    const formData = {
      name,
      description: description.trim() || null,
      amountInCents: amountInCents ? Math.round(parseFloat(amountInCents) * 100) : null,
      color,
      ...(iconFile && { file: iconFile }),
    };
    onSave(formData);
  };

  const handleIconUpload = (files: File[]) => {
    if (files.length > 0) {
      setIconFile(files[0]);
      // Effacer l'URL de l'icône existante quand une nouvelle icône est uploadée
      setExistingIconUrl('');
      const reader = new FileReader();
      reader.onload = (e) => {
        setIconPreview(e.target?.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleRemoveIcon = () => {
    setIconFile(null);
    setIconPreview('');
    setExistingIconUrl('');
  };

  const isFormValid = name.trim().length > 0;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {category
          ? t('sections.categoriesAdministration.modal.edit_title')
          : t('sections.categoriesAdministration.modal.create_title')}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label={t('sections.categoriesAdministration.modal.name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label={t('description')}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
          />

          <TextField
            fullWidth
            label={t('amount')}
            value={amountInCents}
            onChange={(e) => setAmountInCents(e.target.value)}
            type="number"
            inputProps={{
              step: 0.01,
              min: 0,
            }}
            helperText="Montant en euros (ex: 10.50)"
          />

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {t('sections.categoriesAdministration.modal.color')}
            </Typography>
            <ColorPicker
              colors={COLORS}
              selected={color}
              onSelectColor={(selectedColor) => setColor(selectedColor as string)}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {t('sections.categoriesAdministration.modal.icon')}
            </Typography>
            <UploadBox
              accept={{ 'image/*': [] }}
              maxFiles={1}
              onDrop={handleIconUpload}
              sx={{ width: '100%', height: 120 }}
            />
            {/* Affichage de l'icône existante ou de la nouvelle icône uploadée */}
            {(existingIconUrl || iconPreview) && (
              <Box sx={{ mt: 1, textAlign: 'center' }}>
                <Box
                  component="img"
                  src={iconPreview || existingIconUrl}
                  alt="Icon preview"
                  sx={{ width: 64, height: 64, borderRadius: 1, objectFit: 'cover' }}
                />
                <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 1 }}>
                  {existingIconUrl && !iconPreview && (
                    <Typography variant="caption" color="text.secondary">
                      Icône actuelle
                    </Typography>
                  )}
                  {iconPreview && (
                    <Typography variant="caption" color="text.secondary">
                      Nouvelle icône
                    </Typography>
                  )}
                  <Button
                    size="small"
                    color="error"
                    onClick={handleRemoveIcon}
                    sx={{ minWidth: 'auto', px: 1 }}
                  >
                    Supprimer
                  </Button>
                </Stack>
              </Box>
            )}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('sections.categoriesAdministration.modal.cancel')}</Button>
        <Button onClick={handleSave} variant="gradient" color="primary" disabled={!isFormValid}>
          {category
            ? t('sections.categoriesAdministration.modal.update')
            : t('sections.categoriesAdministration.modal.create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
