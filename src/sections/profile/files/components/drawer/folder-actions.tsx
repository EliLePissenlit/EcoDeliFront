import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';

type FolderActionsProps = {
  onDelete: () => void;
  onCreateFolder: () => void;
  onToggleUpload: () => void;
  isDeleting: boolean;
};

export function FolderActions({
  onDelete,
  onCreateFolder,
  onToggleUpload,
  isDeleting,
}: FolderActionsProps) {
  const { t } = useTranslate();

  return (
    <Stack direction="row" spacing={2} justifyContent="space-between">
      <LoadingButton
        variant="outlined"
        color="error"
        startIcon={<Iconify icon="eva:trash-2-fill" />}
        onClick={onDelete}
        loading={isDeleting}
      >
        {t('profile.files.delete')}
      </LoadingButton>

      <Stack direction="column" spacing={2}>
        <Button
          variant="outlined"
          startIcon={<Iconify icon="eva:folder-add-fill" />}
          onClick={onCreateFolder}
        >
          {t('common.create_folder')}
        </Button>

        <Button
          variant="outlined"
          startIcon={<Iconify icon="eva:cloud-upload-fill" />}
          onClick={onToggleUpload}
        >
          {t('common.upload')}
        </Button>
      </Stack>
    </Stack>
  );
}
