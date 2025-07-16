import { useSnackbar } from 'notistack';
import { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import type { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import i18n from 'src/locales/i18n';
import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import { Upload } from 'src/components/upload';

import {
  ListFilesDocument,
  useListFilesQuery,
  useCreateFilesMutation,
  ListFilesInFolderDocument,
} from 'src/types/graphql/typeDefs';

// ----------------------------------------------------------------------

type Props = DialogProps & {
  open: boolean;
  onClose: () => void;
  onCreate?: () => void;
  initialFolderId?: string;
};

export function UploadDialog({
  open,
  onClose,
  onCreate,
  initialFolderId,
  title = i18n.t('common.upload_dialog'),
  ...other
}: Props) {
  const { t } = useTranslate();
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(initialFolderId || null);
  const { enqueueSnackbar } = useSnackbar();
  const { data: foldersData } = useListFilesQuery();

  const folders = foldersData?.listFiles?.filter((file) => file.isFolder) || [];

  const [createFiles, { loading }] = useCreateFilesMutation({
    onCompleted: () => {
      enqueueSnackbar(t('profile.files.upload_success'), {
        variant: 'success',
      });
      onClose();
    },
    refetchQueries: [ListFilesDocument, ListFilesInFolderDocument],
  });

  useEffect(() => {
    if (!open) {
      setFiles([]);
      setSelectedFolderId(initialFolderId || null);
    }
  }, [open, initialFolderId]);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

  const handleUpload = () => {
    createFiles({
      variables: {
        files,
        parentFolderId: selectedFolderId,
      },
    });
  };

  const handleRemoveFile = (inputFile: File | string) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
        <DialogTitle>{title}</DialogTitle>
        <IconButton onClick={onClose}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </Stack>

      <DialogContent dividers sx={{ pt: 1, pb: 2, border: 'none' }}>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel>{t('common.select_folder')}</InputLabel>
            <Select
              value={selectedFolderId || ''}
              onChange={(e) => setSelectedFolderId(e.target.value)}
              label={t('common.select_folder')}
            >
              <MenuItem value="">{t('common.root_folder')}</MenuItem>
              {folders.map((folder) => (
                <MenuItem key={folder.id} value={folder.id}>
                  {folder.displayName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Upload multiple files={files} onDrop={handleDrop} onRemove={handleRemoveFile} />
        </Stack>
      </DialogContent>

      <DialogActions>
        {!!files.length && (
          <Button variant="outlined" color="inherit" onClick={handleRemoveAllFiles}>
            {t('common.remove_all')}
          </Button>
        )}
        <LoadingButton
          variant="gradient"
          disabled={!files.length}
          startIcon={<Iconify icon="eva:cloud-upload-fill" />}
          onClick={handleUpload}
          loading={loading}
        >
          {t('common.upload')}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
