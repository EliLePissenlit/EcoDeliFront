import Box from '@mui/material/Box';

import { File } from 'src/types/graphql/typeDefs';

// eslint-disable-next-line import/no-cycle
import { FileComponent } from '../file';

type FileGridProps = {
  files: File[];
  onDrawerClose: () => void;
};

export function FileGrid({ files, onDrawerClose }: FileGridProps) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(1, 1fr)',
      }}
      gap={2}
    >
      {files.map((file) => (
        <FileComponent key={file.id} file={file} compact onDrawerClose={onDrawerClose} />
      ))}
    </Box>
  );
}
