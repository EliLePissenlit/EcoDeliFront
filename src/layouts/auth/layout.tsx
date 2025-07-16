import Box from '@mui/material/Box';
import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { Header } from './header';
import Footer from '../common/footer';
import { Main, Content } from './main';

// ----------------------------------------------------------------------

export type AuthSplitLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
  section?: {
    title?: string;
    imgUrl?: string;
    subtitle?: string;
  };
};

export function AuthSplitLayout({ sx, section, children, header }: AuthSplitLayoutProps) {
  const layoutQuery: Breakpoint = 'md';

  return (
    <Box sx={{ minHeight: 1, display: 'flex', flexDirection: 'column' }}>
      <Header />

      <Main layoutQuery={layoutQuery} style={{ marginTop: 64, flexGrow: 1 }}>
        <Content layoutQuery={layoutQuery}>{children}</Content>
      </Main>

      <Footer />
    </Box>
  );
}
