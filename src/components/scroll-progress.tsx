import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

type ScrollProgressProps = {
  scrollYProgress: number;
};

export default function ScrollProgress({ scrollYProgress }: ScrollProgressProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 9999,
        background: `linear-gradient(to right, 
          ${theme.palette.primary.main} ${scrollYProgress}%, 
          transparent ${scrollYProgress}%
        )`,
        pointerEvents: 'none',
      }}
    />
  );
}
