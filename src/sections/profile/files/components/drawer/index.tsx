import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import type { DrawerProps } from '@mui/material/Drawer';

import Scrollbar from 'src/components/scrollbar';

import { FileType, File as GraphQLFile } from 'src/types/graphql/typeDefs';

// eslint-disable-next-line import/no-cycle
import { Header } from './header';
// eslint-disable-next-line import/no-cycle
import { FileGrid } from './file-grid';
import { UploadZone } from './upload-zone';
import { FileActions } from './file-actions';
import { FolderActions } from './folder-actions';
import { FolderDialog } from '../../form/folder';
import { useFileDrawer } from './use-file-drawer';

type Props = DrawerProps & {
  item: GraphQLFile;
  onClose: () => void;
};

export function FileDrawer({ item, open, onClose }: Props) {
  const {
    files,
    upload,
    loading,
    isDeleting,
    isDownloading,
    folderFiles,
    handleDrop,
    handleUpload,
    handleDelete,
    handleRemoveFile,
    handleDownload,
    setOpenCreateFolder,
    setUpload,
    openCreateFolder,
  } = useFileDrawer({ item, onClose });

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      PaperProps={{
        sx: {
          width: {
            xs: '100%',
            sm: '45%',
          },
          transition: 'width 0.3s ease-in-out',
        },
      }}
      slotProps={{ backdrop: { invisible: true } }}
    >
      <Box sx={{ position: 'relative', height: '100%' }}>
        <Scrollbar>
          <Header item={item} onClose={onClose} />

          <Divider sx={{ borderStyle: 'dashed' }} />

          {item.isFolder ? (
            <Stack spacing={3} sx={{ p: 2.5 }}>
              {item.fileType !== FileType.UserInvoicesFolder && (
                <>
                  <FolderActions
                    onDelete={handleDelete}
                    onCreateFolder={() => setOpenCreateFolder(true)}
                    onToggleUpload={() => setUpload({ value: !upload.value, onTrue: () => {} })}
                    isDeleting={isDeleting}
                  />

                  <UploadZone
                    open={upload.value}
                    files={files}
                    loading={loading}
                    onDrop={handleDrop}
                    onRemove={handleRemoveFile}
                    onUpload={handleUpload}
                  />
                </>
              )}

              <FileGrid files={folderFiles} onDrawerClose={onClose} />
            </Stack>
          ) : (
            <Stack spacing={3} sx={{ p: 2.5 }}>
              <FileActions
                item={item}
                isDeleting={isDeleting}
                isDownloading={isDownloading}
                onDelete={handleDelete}
                onDownload={handleDownload}
              />
            </Stack>
          )}
        </Scrollbar>
      </Box>

      <FolderDialog
        open={openCreateFolder}
        onClose={() => setOpenCreateFolder(false)}
        parentFolderId={item.id}
      />
    </Drawer>
  );
}
