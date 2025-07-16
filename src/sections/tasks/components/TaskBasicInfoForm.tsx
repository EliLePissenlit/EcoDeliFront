import { useFormContext } from 'react-hook-form';
import React, { useState, useEffect } from 'react';

import { Box, Stack, Button, MenuItem, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';

import { UploadBox } from 'src/components/upload';
import RHFEditor from 'src/components/hook-form/rhf-editor';
import { RHFSelect } from 'src/components/hook-form/rhf-select';
import RHFTextField from 'src/components/hook-form/rhf-text-field';

import { TaskType } from 'src/types/graphql/typeDefs';

interface TaskBasicInfoFormProps {
  formData: any;
  isValid: boolean;
}

export default function TaskBasicInfoForm({ formData, isValid }: TaskBasicInfoFormProps) {
  const { t } = useTranslate();
  const { setValue } = useFormContext();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Mettre à jour l'aperçu quand formData.file change
  useEffect(() => {
    if (formData.file) {
      if (formData.file instanceof File) {
        // Nouveau fichier uploadé
        setImageFile(formData.file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(formData.file);
      } else if (typeof formData.file === 'string') {
        // URL d'image existante
        setImagePreview(formData.file);
        setImageFile(null);
      }
    } else {
      // Aucune image
      setImageFile(null);
      setImagePreview('');
    }
  }, [formData.file]);

  const handleImageUpload = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setImageFile(file);

      // Créer l'aperçu
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Mettre à jour le formulaire React Hook Form
      setValue('file', file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');

    // Mettre à jour le formulaire React Hook Form
    setValue('file', null);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6">{t('tasks.form.basic_info.title')}</Typography>

      <RHFTextField
        name="title"
        label={t('tasks.form.basic_info.title_label')}
        placeholder={t('tasks.form.basic_info.title_placeholder')}
        required
      />

      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {t('tasks.form.basic_info.description_label')}
        </Typography>
        <RHFEditor
          name="description"
          placeholder={t('tasks.form.basic_info.description_placeholder')}
          sx={{ minHeight: 200 }}
        />
      </Box>

      <RHFSelect name="type" label={t('tasks.form.basic_info.task_type_label')} required>
        <MenuItem value={TaskType.Service}>{t('tasks.form.basic_info.service')}</MenuItem>
        <MenuItem value={TaskType.Shipping}>{t('tasks.form.basic_info.shipping')}</MenuItem>
      </RHFSelect>

      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {t('tasks.form.basic_info.image_label')}
        </Typography>
        <UploadBox
          accept={{ 'image/*': [] }}
          maxFiles={1}
          onDrop={handleImageUpload}
          helperText={t('tasks.form.basic_info.image_helper')}
          sx={{ width: '100%', height: 120 }}
        />

        {/* Affichage de l'aperçu de l'image */}
        {imagePreview && (
          <Box sx={{ mt: 1, textAlign: 'center' }}>
            <Box
              component="img"
              src={imagePreview}
              alt="Image preview"
              sx={{
                width: 120,
                height: 120,
                borderRadius: 1,
                objectFit: 'cover',
                border: '1px solid',
                borderColor: 'divider',
              }}
            />
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {imageFile ? t('common.new_image') : t('common.current_image')}
              </Typography>
              <Button
                size="small"
                color="error"
                onClick={handleRemoveImage}
                sx={{ minWidth: 'auto', px: 1 }}
              >
                {t('common.remove')}
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </Stack>
  );
}
