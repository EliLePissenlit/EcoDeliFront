import { useDropzone } from 'react-dropzone';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';
import { UploadIllustration } from 'src/assets/illustrations';

import Iconify from '../iconify';
import { UploadProps } from './types';
import MultiFilePreview from './preview-multi-file';
import RejectionFiles from './errors-rejection-files';
import SingleFilePreview from './preview-single-file';

// ----------------------------------------------------------------------

export default function Upload({
  disabled,
  multiple = false,
  error,
  helperText,
  //
  file,
  onDelete,
  //
  files,
  thumbnail,
  onUpload,
  onRemove,
  onRemoveAll,
  sx,
  ...other
}: UploadProps) {
  const { t } = useTranslate();
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple,
    disabled,
    ...other,
  });

  const hasFile = !!file && !multiple;

  const hasFiles = !!files && multiple && !!files.length;

  const hasError = isDragReject || !!error;

  const renderPlaceholder = (
    <Stack spacing={3} alignItems="center" justifyContent="center" flexWrap="wrap">
      <UploadIllustration sx={{ width: 1, maxWidth: 200 }} />
      <Stack spacing={1} sx={{ textAlign: 'center' }}>
        <Typography variant="h6">{t('common.upload_dialog_subtitle')}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('common.upload_dialog_description')}
          <Box
            component="span"
            sx={{
              mx: 0.5,
              color: 'primary.main',
              textDecoration: 'underline',
            }}
          >
            {t('common.browse')}
          </Box>
          {t('common.through_your_machine')}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderSinglePreview = (
    <SingleFilePreview imgUrl={typeof file === 'string' ? file : file?.preview} />
  );

  const removeSinglePreview = hasFile && onDelete && (
    <IconButton
      size="small"
      onClick={onDelete}
      sx={{
        top: 16,
        right: 16,
        zIndex: 9,
        position: 'absolute',
        color: (theme) => alpha(theme.palette.common.white, 0.8),
        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
        '&:hover': {
          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
        },
      }}
    >
      <Iconify icon="mingcute:close-line" width={18} />
    </IconButton>
  );

  const renderMultiPreview = hasFiles && (
    <>
      <Box sx={{ my: 3 }}>
        <MultiFilePreview files={files} thumbnail={thumbnail} onRemove={onRemove} />
      </Box>

      <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
        {onRemoveAll && (
          <Button color="inherit" variant="outlined" size="small" onClick={onRemoveAll}>
            Remove All
          </Button>
        )}

        {onUpload && (
          <Button
            size="small"
            variant="gradient"
            onClick={onUpload}
            startIcon={<Iconify icon="eva:cloud-upload-fill" />}
          >
            Upload
          </Button>
        )}
      </Stack>
    </>
  );

  return (
    <Box sx={{ width: 1, position: 'relative', ...sx }}>
      <Box
        {...getRootProps()}
        sx={{
          p: 5,
          outline: 'none',
          borderRadius: 1,
          cursor: 'pointer',
          overflow: 'hidden',
          position: 'relative',
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
          border: (theme) => `1px dashed ${alpha(theme.palette.grey[500], 0.2)}`,
          transition: (theme) => theme.transitions.create(['opacity', 'padding']),
          '&:hover': {
            opacity: 0.72,
          },
          ...(isDragActive && {
            opacity: 0.72,
          }),
          ...(disabled && {
            opacity: 0.48,
            pointerEvents: 'none',
          }),
          ...(hasError && {
            color: 'error.main',
            borderColor: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
          }),
          ...(hasFile && {
            padding: '24% 0',
          }),
        }}
      >
        <input {...getInputProps()} />

        {hasFile ? renderSinglePreview : renderPlaceholder}
      </Box>

      {removeSinglePreview}

      {helperText && helperText}

      <RejectionFiles fileRejections={fileRejections} />

      {renderMultiPreview}
    </Box>
  );
}
