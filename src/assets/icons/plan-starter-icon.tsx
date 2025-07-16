import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

function PlanStarterIcon({ ...other }: BoxProps) {
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
      <g transform="translate(0 -5)">
        <g transform="translate(0 9.15)">
          <g transform="translate(9.167 19.963)">
            <path fill={DARK_COLOR} d="M53.333 17.467H61.666V24.953H53.333z" />

            <path
              fill={DARKER_COLOR}
              d="M.935 20.45L25.963 8.015a5.052 5.052 0 014.52.012L60.74 23.263a1.685 1.685 0 01.015 3.001L35.417 39.361a5.052 5.052 0 01-4.694-.029L.893 23.446a1.685 1.685 0 01.042-2.995z"
            />

            <path
              fill={DARK_COLOR}
              d="M32.5 34.204v4.185a1.133 1.133 0 01-1.566 1.047l-.1-.047v-7.537a2.494 2.494 0 011.666 2.352zM.833 15.932l30 15.92v7.537l-30-15.923v-.02l-.115-.066A1.568 1.568 0 010 22.063V14.14l.833 1.792z"
            />

            <path
              fill={MAIN_COLOR}
              fillRule="nonzero"
              d="M.935 12.965L25.963.528a5.052 5.052 0 014.52.012L60.74 15.777a1.685 1.685 0 01.015 3.001L35.417 31.875a5.052 5.052 0 01-4.694-.029L.893 15.96a1.685 1.685 0 01.042-2.995z"
            />
          </g>
        </g>

        <g transform="translate(9.167 19.963)">
          <path fill={DARK_COLOR} d="M53.333 17.467H61.666V24.953H53.333z" />

          <path
            fill={DARKER_COLOR}
            d="M.935 20.45L25.963 8.015a5.052 5.052 0 014.52.012L60.74 23.263a1.685 1.685 0 01.015 3.001L35.417 39.361a5.052 5.052 0 01-4.694-.029L.893 23.446a1.685 1.685 0 01.042-2.995z"
          />

          <path
            fill={DARK_COLOR}
            d="M32.5 34.204v4.185a1.133 1.133 0 01-1.566 1.047l-.1-.047v-7.537a2.494 2.494 0 011.666 2.352zM.833 15.932l30 15.92v7.537l-30-15.923v-.02l-.115-.066A1.568 1.568 0 010 22.063V14.14l.833 1.792z"
          />

          <path
            fill={MAIN_COLOR}
            fillRule="nonzero"
            d="M.935 12.965L25.963.528a5.052 5.052 0 014.52.012L60.74 15.777a1.685 1.685 0 01.015 3.001L35.417 31.875a5.052 5.052 0 01-4.694-.029L.893 15.96a1.685 1.685 0 01.042-2.995z"
          />
        </g>
      </g>
    </Box>
  );
}

export default memo(PlanStarterIcon);
