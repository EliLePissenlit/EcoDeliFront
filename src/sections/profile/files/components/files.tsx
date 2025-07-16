import { useRef } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';

import { useBoolean } from 'src/hooks/use-boolean';

import type { TableProps } from 'src/components/table';

import { File } from 'src/types/graphql/typeDefs';

import { FileComponent } from './file';

// ----------------------------------------------------------------------

type Props = {
  table: TableProps;
  dataFiltered: File[];
  onOpenConfirm: () => void;
};

export function Files({ table, dataFiltered, onOpenConfirm }: Props) {
  const files = useBoolean();

  const containerRef = useRef(null);

  return (
    <Box ref={containerRef}>
      <Divider sx={{ my: 5, borderStyle: 'dashed' }} />

      <Collapse in={!files.value} unmountOnExit>
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={3}
        >
          {dataFiltered.map((file) => (
            <FileComponent key={file.id} file={file} sx={{ maxWidth: 'auto' }} />
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}
