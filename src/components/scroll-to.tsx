import { useRef, useState, useEffect } from 'react';

import { Fab } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from './iconify/iconify';

const ScrollToTop = styled(Fab)(({ theme }) => ({
  zIndex: 99999,
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    opacity: 0.72,
  },
}));

const ScrollToBottom = styled(Fab)(({ theme }) => ({
  zIndex: 99999,
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    opacity: 0.72,
  },
}));

export default function ScrollTo() {
  const isMobile = useResponsive('down', 'sm');

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScrollToBottom = (): void => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  const topRef = useRef<HTMLButtonElement | null>(null);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    !isMobile && (
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
        }}
      >
        {!isAtTop && (
          <ScrollToTop ref={topRef} size="small" variant="gradient" onClick={handleScrollToTop}>
            <Iconify icon="bi:arrow-up" />
          </ScrollToTop>
        )}
        <ScrollToBottom size="small" variant="gradient" onClick={handleScrollToBottom}>
          <Iconify icon="bi:arrow-down" />
        </ScrollToBottom>
      </div>
    )
  );
}
