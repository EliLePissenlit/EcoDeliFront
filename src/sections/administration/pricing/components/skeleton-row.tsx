import { TableRow, Skeleton, TableCell } from '@mui/material';

export default function SkeletonRow() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton variant="text" width={200} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={80} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={80} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={80} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={60} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={60} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={80} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={120} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={60} />
      </TableCell>
    </TableRow>
  );
}
