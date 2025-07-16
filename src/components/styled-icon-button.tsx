import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface StyledIconButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const StyledIconButton = ({ children, onClick }: StyledIconButtonProps) => {
  const theme = useTheme();
  return (
    <IconButton
      size="small"
      sx={{
        marginLeft: 2,
        color: theme.palette.common.white,
      }}
    >
      {children}
    </IconButton>
  );
};

export default StyledIconButton;
