import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import type { CardProps } from '@mui/material/Card';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDateTime } from 'src/utils/format-time';

import { useTranslate } from 'src/locales';

import FileThumbnail from 'src/components/file-thumbnail/file-thumbnail';

import { File } from 'src/types/graphql/typeDefs';

// eslint-disable-next-line import/no-cycle
import { FileDrawer } from './drawer';
// ----------------------------------------------------------------------

type Props = CardProps & {
  selected?: boolean;
  file: File;
  onSelect?: () => void;
  onDrawerClose?: () => void;
  compact?: boolean;
};

export function FileComponent({
  file,
  selected,
  onSelect,
  onDrawerClose,
  compact,
  sx,
  ...other
}: Props) {
  const details = useBoolean();
  const { t } = useTranslate();
  const handleOpenDetails = () => {
    details.onTrue();
  };

  return (
    <>
      <Paper
        onClick={handleOpenDetails}
        sx={{
          p: compact ? 1 : 2,
          cursor: 'pointer',
          borderRadius: 1,
          position: 'relative',
          bgcolor: 'transparent',
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
          '&:hover': {
            bgcolor: 'background.neutral',
          },
          ...sx,
        }}
        {...other}
      >
        <Stack spacing={compact ? 0.5 : 2}>
          <FileThumbnail
            file={file.displayName}
            isFolder={file.isFolder}
            sx={{ width: compact ? 24 : 40, height: compact ? 24 : 40 }}
          />

          <Stack spacing={compact ? 0.25 : 1}>
            <Typography
              variant={compact ? 'caption' : 'subtitle1'}
              sx={{
                minHeight: compact ? 32 : 40,
              }}
            >
              {file.displayName === 'USER_INVOICES_FOLDER'
                ? t('profile.files.USER_INVOICES_FOLDER')
                : file.displayName}
            </Typography>

            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              {fDateTime(file.createdAt)}
            </Typography>
          </Stack>
        </Stack>
      </Paper>

      <FileDrawer item={file} open={details.value} onClose={details.onFalse} />
    </>
  );
}
