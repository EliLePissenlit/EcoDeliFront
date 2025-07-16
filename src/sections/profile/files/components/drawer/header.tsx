import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { fDateTime } from 'src/utils/format-time';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import FileThumbnail from 'src/components/file-thumbnail/file-thumbnail';

import { File } from 'src/types/graphql/typeDefs';

type Props = {
  item: File;
  onClose: () => void;
};

export function Header({ item, onClose }: Props) {
  const { t } = useTranslate();

  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: 'absolute',
          right: 8,
          p: 1,
          top: 8,
          zIndex: 9,
        }}
      >
        <IconButton onClick={onClose}>
          <Iconify icon="eva:close-fill" />
        </IconButton>
      </Stack>

      <Stack spacing={2.5} sx={{ p: 2.5, bgcolor: 'background.neutral' }}>
        <FileThumbnail
          file={item.displayName}
          isFolder={item.isFolder}
          imageView
          sx={{ width: 'auto', height: 'auto', alignSelf: 'flex-start' }}
        />

        <Stack spacing={1}>
          <Typography variant="subtitle1" sx={{ wordBreak: 'break-all' }}>
            {item.displayName === 'USER_INVOICES_FOLDER'
              ? t('profile.files.USER_INVOICES_FOLDER')
              : item.displayName}
          </Typography>

          <Stack spacing={0.5}>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              {t('common.created_at')}: {fDateTime(item.createdAt)}
            </Typography>

            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              {t('common.updated_at')}: {fDateTime(item.updatedAt)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
