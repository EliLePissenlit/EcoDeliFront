import { Theme, alpha } from '@mui/material/styles';
import { tableRowClasses } from '@mui/material/TableRow';
import { tableCellClasses } from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export function table(theme: Theme) {
  return {
    MuiTable: {
      styleOverrides: {
        root: {
          background: 'transparent',
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          background: 'transparent',
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          position: 'relative',
          background: `linear-gradient(135deg, 
            ${alpha(theme.palette.background.default, 0.2)}, 
            ${alpha(theme.palette.background.default, 0.1)})`,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: alpha(theme.palette.common.white, 0.1),
          boxShadow: `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.1)}`,
          borderRadius: theme.shape.borderRadius,
          '&:hover': {
            boxShadow: `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.2)}`,
            borderColor: alpha(theme.palette.common.white, 0.2),
          },
          transition: theme.transitions.create(['box-shadow', 'border-color'], {
            duration: theme.transitions.duration.shorter,
          }),
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          background: 'transparent !important',
          [`&.${tableRowClasses.selected}`]: {
            backgroundColor: `${alpha(theme.palette.primary.dark, 0.08)} !important`,
            '&:hover': {
              backgroundColor: `${alpha(theme.palette.primary.dark, 0.12)} !important`,
            },
          },
          '&:hover': {
            backgroundColor: `${alpha(theme.palette.background.default, 0.04)} !important`,
          },
          '&:last-of-type': {
            [`& .${tableCellClasses.root}`]: {
              borderColor: 'transparent',
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomStyle: 'dashed',
          borderBottomColor: alpha(theme.palette.common.white, 0.1),
        },
        head: {
          fontSize: 14,
          color: theme.palette.text.secondary,
          fontWeight: theme.typography.fontWeightSemiBold,
          backgroundColor: 'transparent',
        },
        stickyHeader: {
          backgroundColor: 'transparent',
          backgroundImage: 'none',
        },
        paddingCheckbox: {
          paddingLeft: theme.spacing(1),
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          width: '100%',
          borderTop: `1px dashed ${alpha(theme.palette.common.white, 0.1)}`,
        },
        toolbar: {
          height: 64,
        },
        actions: {
          marginRight: 8,
        },
        select: {
          paddingLeft: 8,
          '&:focus': {
            borderRadius: theme.shape.borderRadius,
          },
        },
        selectIcon: {
          right: 4,
          width: 16,
          height: 16,
          top: 'calc(50% - 8px)',
        },
      },
    },
  };
}
