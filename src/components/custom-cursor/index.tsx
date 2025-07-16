import { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';

export const CursorDot = styled('div')(({ theme }) => ({
  width: '16px',
  height: '16px',
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 9999,
  transform: 'translate(-50%, -50%)',
  transition: 'transform 0.1s ease',
  opacity: 0.8,
}));

export const CustomCursor = ({ show = false }: { show?: boolean }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  if (!show) return null;

  return (
    <CursorDot
      style={{
        left: position.x,
        top: position.y,
      }}
    />
  );
};
