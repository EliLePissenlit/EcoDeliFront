import React, { ReactNode } from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { darkTheme } from '../../theme/theme';

interface ButtonProps extends Omit<MuiButtonProps, 'component'> {
  icon?: ReactNode;
  text: string;
  to?: string;
}

const StyledButton = styled(MuiButton)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: darkTheme.palette.background.default,
  padding: '10px 24px',
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    color: darkTheme.palette.background.default,
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(1),
  },
}));

export const Button = ({ icon, text, to, ...props }: ButtonProps) => {
  const buttonContent = (
    <StyledButton
      startIcon={icon}
      {...props}
    >
      {text}
    </StyledButton>
  );

  if (to) {
    return (
      <Link to={to} style={{ textDecoration: 'none' }}>
        {buttonContent}
      </Link>
    );
  }

  return buttonContent;
}; 