import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { RHFUploadAvatar } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';

type AvatarFormProps = {
  onSubmit: (file: File) => Promise<void>;
  loading: boolean;
  currentAvatar?: string | null;
};

export const AvatarForm: FC<AvatarFormProps> = ({ onSubmit, loading, currentAvatar }) => {
  const { t } = useTranslate();

  const methods = useForm({
    defaultValues: {
      avatar: currentAvatar || '',
    },
  });

  const handleDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      await onSubmit(file);
    }
  };

  return (
    <FormProvider methods={methods}>
      <Box sx={{ mb: 2 }}>
        <RHFUploadAvatar
          name="avatar"
          disabled={loading}
          onDrop={handleDrop}
          helperText={
            <Typography
              variant="caption"
              sx={{
                mt: 2,
                mx: 'auto',
                display: 'block',
                textAlign: 'center',
                color: 'text.secondary',
              }}
            >
              {t('common.allowed_files')} *.jpeg, *.jpg, *.png, *.gif
            </Typography>
          }
        />
      </Box>
    </FormProvider>
  );
};
