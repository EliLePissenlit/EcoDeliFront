import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import { useTable } from 'src/components/table';
import { EmptyContent } from 'src/components/empty-content';

import { File, useListFilesQuery } from 'src/types/graphql/typeDefs';

import { Files } from './components/files';
import { FolderDialog } from './form/folder';
import { UploadDialog } from './form/upload';

// ----------------------------------------------------------------------

export function FilesView() {
  const { t } = useTranslate();
  const table = useTable({ defaultRowsPerPage: 100 });

  const confirm = useBoolean();

  const upload = useBoolean();

  const folder = useBoolean();

  const { data } = useListFilesQuery();

  const [tableData, setTableData] = useState<File[]>([]);

  useEffect(() => {
    const files = data?.listFiles ?? [];
    if (files?.length) {
      setTableData(files as File[]);
    }
  }, [data?.listFiles]);

  const notFound = tableData.length === 0;

  return (
    <Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Stack>
          <Typography variant="h4">{t('profile.files.title')}</Typography>
          <Typography variant="caption">{t('profile.files.description')}</Typography>
        </Stack>
        <Stack direction="column" alignItems="center" gap={2} sx={{ minWidth: 200 }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Iconify icon="eva:folder-fill" />}
            onClick={folder.onTrue}
          >
            {t('common.create_folder')}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Iconify icon="eva:cloud-upload-fill" />}
            onClick={upload.onTrue}
          >
            {t('common.upload')}
          </Button>
        </Stack>
      </Stack>

      {notFound ? (
        <EmptyContent filled sx={{ py: 10 }} />
      ) : (
        <Files table={table} dataFiltered={tableData} onOpenConfirm={confirm.onTrue} />
      )}

      <UploadDialog open={upload.value} onClose={upload.onFalse} />
      <FolderDialog open={folder.value} onClose={folder.onFalse} />
    </Stack>
  );
}

// ----------------------------------------------------------------------
