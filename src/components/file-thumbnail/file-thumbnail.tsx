import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { Theme, SxProps } from '@mui/material/styles';

import { DownloadButton } from './action-buttons';
import { fileData, fileThumb, fileFormat } from './utils';

// ----------------------------------------------------------------------

type FileIconProps = {
  file: File | string;
  isFolder?: boolean;
  tooltip?: boolean;
  imageView?: boolean;
  onDownload?: VoidFunction;
  sx?: SxProps<Theme>;
  imgSx?: SxProps<Theme>;
};

export default function FileThumbnail({
  file,
  isFolder,
  tooltip,
  imageView,
  onDownload,
  sx,
  imgSx,
}: FileIconProps) {
  const { name = '', path = '', preview = '' } = fileData(file);

  const format = fileFormat(path || preview);

  // eslint-disable-next-line no-nested-ternary
  const renderContent = isFolder ? (
    <Box
      component="img"
      src="/assets/icons/files/ic_folder.svg"
      sx={{
        width: 32,
        height: 32,
        flexShrink: 0,
        ...sx,
      }}
    />
  ) : format === 'image' && imageView ? (
    <Box
      component="img"
      src={preview}
      sx={{
        width: 1,
        height: 1,
        flexShrink: 0,
        objectFit: 'cover',
        ...imgSx,
      }}
    />
  ) : (
    <Box
      component="img"
      src={fileThumb(format)}
      sx={{
        width: 32,
        height: 32,
        flexShrink: 0,
        ...sx,
      }}
    />
  );

  if (tooltip) {
    return (
      <Tooltip title={name}>
        <Stack
          flexShrink={0}
          component="span"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 'fit-content',
            height: 'inherit',
          }}
        >
          {renderContent}
          {onDownload && <DownloadButton onDownload={onDownload} />}
        </Stack>
      </Tooltip>
    );
  }

  return (
    <>
      {renderContent}
      {onDownload && <DownloadButton onDownload={onDownload} />}
    </>
  );
}
