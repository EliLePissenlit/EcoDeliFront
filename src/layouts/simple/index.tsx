import { ReactNode } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import Footer from '../common/footer';
import { SimpleHeader } from './header';

type Props = {
  children: ReactNode;
};

export default function SimpleLayout({ children }: Props) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: `linear-gradient(135deg, 
          ${theme.palette.background.default} 0%, 
          ${theme.palette.background.paper} 100%
        )`,
      }}
    >
      <SimpleHeader />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          pt: { xs: 8, md: 10 },
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            backdropFilter: 'blur(20px)',
            background: `linear-gradient(135deg, 
              ${theme.palette.background.paper}80 0%, 
              ${theme.palette.background.default}80 100%
            )`,
            borderBottom: `1px solid ${theme.palette.divider}20`,
            boxShadow: `0 8px 32px ${theme.palette.common.black}10`,
            width: '100%',
          }}
        >
          {children}
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}
