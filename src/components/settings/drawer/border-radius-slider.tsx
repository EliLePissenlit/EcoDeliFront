import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
// ----------------------------------------------------------------------

type Props = {
  value: number;
  onChange: (newValue: number) => void;
};

export default function BorderRadiusSlider({ value, onChange }: Props) {
  const theme = useTheme();
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="caption" component="div" sx={{ mb: 1 }}>
        Border Radius: {value}px
      </Typography>
      <Slider
        value={value}
        onChange={(_, newValue) => onChange(newValue as number)}
        min={0}
        max={24}
        step={1}
        sx={{
          '& .MuiSlider-thumb': {
            backgroundColor: theme.palette.primary.main,
            '&:hover, &.Mui-focusVisible': {
              boxShadow: `0 0 0 8px ${theme.palette.primary.lighter}`,
            },
            '&.Mui-active': {
              boxShadow: `0 0 0 14px ${theme.palette.primary.lighter}`,
            },
          },
          '& .MuiSlider-track': {
            backgroundColor: theme.palette.primary.main,
          },
          '& .MuiSlider-rail': {
            backgroundColor: theme.palette.grey[300],
          },
        }}
        marks
        valueLabelDisplay="auto"
        valueLabelFormat={(val) => `${val}px`}
      />
    </Box>
  );
}
