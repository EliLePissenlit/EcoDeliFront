import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import { Collapse } from '@mui/material';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import { Upload } from 'src/components/upload';

type UploadZoneProps = {
  open: boolean;
  files: File[];
  loading: boolean;
  onDrop: (files: File[]) => void;
  onRemove: (file: File) => void;
  onUpload: () => void;
};

export function UploadZone({ open, files, loading, onDrop, onRemove, onUpload }: UploadZoneProps) {
  const { t } = useTranslate();

  return (
    <Collapse in={open}>
      <Stack spacing={2}>
        <Upload
          multiple
          files={files}
          onDrop={onDrop}
          onRemove={(file: File | string) => onRemove(file as File)}
          sx={{
            '& .MuiBox-root': { p: 2 },
            '& .MuiStack-root': { minHeight: 'unset' },
          }}
        />

        {!!files.length && (
          <LoadingButton
            variant="gradient"
            startIcon={<Iconify icon="eva:cloud-upload-fill" />}
            onClick={onUpload}
            loading={loading}
            size="small"
          >
            {t('common.upload')}
          </LoadingButton>
        )}
      </Stack>
    </Collapse>
  );
}
