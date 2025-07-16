import { useLocation } from 'react-router-dom';
import React, { useRef, useEffect } from 'react';

import { Fab } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useRouter } from 'src/hooks/use-router';
import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from './iconify/iconify';

const NavigateBack = styled(Fab)(({ theme }) => ({
  zIndex: 9999,
  position: 'fixed',
  bottom: theme.spacing(3),
  left: theme.spacing(3),
  variant: 'gradient',
  opacity: 0,
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    opacity: 0.72,
  },
}));

export default function NavigateBackComponent() {
  const isMobile = useResponsive('down', 'sm');
  const router = useRouter();
  const location = useLocation();
  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const shouldShowButton = location.pathname !== '/';
    if (ref.current) {
      ref.current.style.opacity = shouldShowButton ? '1' : '0';
    }
  }, [location]);

  return (
    !isMobile && (
      <NavigateBack ref={ref} size="small" variant="gradient" onClick={router.back}>
        <Iconify icon="bi:arrow-left" />
      </NavigateBack>
    )
  );
}
