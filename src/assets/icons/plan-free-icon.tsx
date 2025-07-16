import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

function PlanFreeIcon({ ...other }: BoxProps) {
  const theme = useTheme();

  const BASE_COLOR =
    theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black;

  const MAIN_COLOR = alpha(BASE_COLOR, 1);
  const DARK_COLOR = alpha(BASE_COLOR, 0.8);
  const DARKER_COLOR = alpha(BASE_COLOR, 0.6);

  return (
    <Box
      component="svg"
      width="100%"
      height="100%"
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <g transform="translate(9.167 20)">
        <path fill={DARK_COLOR} d="M53.333 17.5H61.666V25H53.333z" />

        <path
          fill={DARKER_COLOR}
          d="M.935 20.489l25.028-12.46a5.044 5.044 0 014.52.012L60.74 23.307a1.69 1.69 0 01.015 3.007l-25.338 13.12a5.044 5.044 0 01-4.694-.028L.893 23.49a1.69 1.69 0 01.042-3.001z"
        />

        <path
          fill={DARK_COLOR}
          d="M32.5 34.268v4.193a1.134 1.134 0 01-1.566 1.049l-.1-.047v-7.551a2.498 2.498 0 011.666 2.356zM.833 15.962l30 15.95v7.55l-30-15.952v-.02l-.115-.066A1.571 1.571 0 010 22.104v-7.937l.833 1.795z"
        />

        <path
          fill={MAIN_COLOR}
          fillRule="nonzero"
          d="M.935 12.989L25.963.529a5.044 5.044 0 014.52.012L60.74 15.807a1.69 1.69 0 01.015 3.007l-25.338 13.12a5.044 5.044 0 01-4.694-.028L.893 15.99a1.69 1.69 0 01.042-3.001z"
        />
      </g>
    </Box>
  );
}

export default memo(PlanFreeIcon);
