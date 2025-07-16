import { useTheme } from '@mui/material/styles';
import { Stack, Container, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';

export default function Footer() {
  const theme = useTheme();
  const { t } = useTranslate();

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{
          py: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: 'transparent',
        }}
      />
      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {t('layout.footer.copyright')}
        </Typography>
      </Stack>
    </Container>
  );
}
