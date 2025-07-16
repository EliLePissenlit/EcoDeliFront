import { Box, TableRow, TableHead, TableCell, TableSortLabel } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  order: 'asc' | 'desc';
  orderBy: string;
  headLabel: any[];
  rowCount?: number;
  numSelected?: number;
  onSort?: (id: string) => void;
  onSelectAllRows?: (checked: boolean) => void;
  sx?: object;
};

export default function PricingConfigsTableHead({
  order,
  orderBy,
  headLabel,
  rowCount = 0,
  numSelected = 0,
  onSort,
  onSelectAllRows,
  sx,
  ...other
}: Props) {
  return (
    <TableHead sx={sx} {...other}>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            {onSort ? (
              <TableSortLabel
                hideSortIcon
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={() => onSort(headCell.id)}
              >
                {headCell.label}

                {orderBy === headCell.id ? (
                  <Box sx={{ typography: 'caption', sx: { color: 'text.secondary' } }}>
                    {order === 'desc' ? ' :desc' : ' :asc'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
