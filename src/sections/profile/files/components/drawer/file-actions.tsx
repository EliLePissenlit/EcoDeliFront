import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';

import { File, FileType } from 'src/types/graphql/typeDefs';

import { Preview } from '../preview';

type FileActionsProps = {
  item: File;
  isDeleting: boolean;
  isDownloading: boolean;
  onDelete: () => void;
  onDownload: () => void;
};

export function FileActions({
  item,
  isDeleting,
  isDownloading,
  onDelete,
  onDownload,
}: FileActionsProps) {
  const { t } = useTranslate();

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} justifyContent="end" alignItems="center">
        {item.fileType !== FileType.Invoice && (
          <LoadingButton
            variant="outlined"
            color="error"
            startIcon={<Iconify icon="eva:trash-2-fill" />}
            onClick={onDelete}
            loading={isDeleting}
          >
            {t('profile.files.delete')}
          </LoadingButton>
        )}

        <LoadingButton
          variant="outlined"
          startIcon={<Iconify icon="eva:download-fill" />}
          onClick={onDownload}
          loading={isDownloading}
        >
          {t('profile.files.download')}
        </LoadingButton>
      </Stack>

      <Preview file={item} />
    </Stack>
  );
}
