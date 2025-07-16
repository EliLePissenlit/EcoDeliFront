import React from 'react';

import { Typography } from '@mui/material';

import { Label } from './label/label';

type Props = {
  title: string;
  children?: React.ReactNode;
  toUpperCase?: boolean;
};

export default function StyledLabel({ title, toUpperCase = false, children }: Props): JSX.Element {
  const formattedTitle = toUpperCase ? title.toUpperCase() : title;

  return (
    <Label sx={{ background: '#FFE8D6' }}>
      <Typography
        variant="caption"
        sx={{
          marginRight: 0.5,
          maxWidth: 100,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {formattedTitle}
      </Typography>
      {children}
    </Label>
  );
}
