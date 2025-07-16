import React from 'react';

import { Stack, TableRow, Skeleton, TableCell } from '@mui/material';

// ----------------------------------------------------------------------

export default function SkeletonRow() {
  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Skeleton variant="rectangular" width={20} height={20} />
      </TableCell>
      <TableCell>
        <Stack direction="row" spacing={2} alignItems="center">
          <Skeleton variant="rectangular" width={32} height={32} />
          <Skeleton variant="text" width={150} />
        </Stack>
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={200} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={100} />
      </TableCell>
      <TableCell>
        <Stack spacing={0.5}>
          <Skeleton variant="text" width={200} />
          <Skeleton variant="text" width={200} />
        </Stack>
      </TableCell>
      <TableCell>
        <Skeleton variant="circular" width={32} height={32} />
      </TableCell>
    </TableRow>
  );
}
