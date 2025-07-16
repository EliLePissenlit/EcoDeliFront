import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import i18n from 'src/locales/i18n';
import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import {
  ListFilesDocument,
  useCreateFolderMutation,
  ListFilesInFolderDocument,
} from 'src/types/graphql/typeDefs';

const folderSchema = Yup.object().shape({
  name: Yup.string().required(i18n.t('common.required_fields')),
});

interface FolderFormData {
  name: string;
}

interface FolderFormProps {
  open: boolean;
  onClose: () => void;
  parentFolderId?: string;
}

export const FolderDialog = ({ open, onClose, parentFolderId }: FolderFormProps) => {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();
  const [createFolder, { loading }] = useCreateFolderMutation({
    onCompleted: () => {
      enqueueSnackbar(t('common.folder_created'), { variant: 'success' });
      reset();
      onClose();
    },
    refetchQueries: [ListFilesDocument, ListFilesInFolderDocument],
  });

  const methods = useForm<FolderFormData>({
    resolver: yupResolver(folderSchema),
    defaultValues: {
      name: '',
    },
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = async (data: FolderFormData) => {
    await createFolder({
      variables: {
        name: data.name,
        parentFolderId,
      },
    });
  };

  const { isValid } = methods.formState;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {t('common.create_folder')}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mt: 2 }}>
            <RHFTextField name="name" label={t('common.folder_name')} />
          </Box>
        </FormProvider>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>{t('common.cancel')}</Button>
        <LoadingButton
          loading={loading}
          onClick={handleSubmit(onSubmit)}
          variant="gradient"
          disabled={!isValid}
        >
          {t('common.create')}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
