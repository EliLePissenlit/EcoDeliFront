import { Grid } from '@mui/material';

import { useTranslate } from 'src/locales';

import StyledPage from 'src/components/styled-page';

import DashboardView from 'src/sections/dashboard/view';

export default function Page() {
  const { t } = useTranslate();
  return (
    <StyledPage title={t('pages.dashboard.title')}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DashboardView />
        </Grid>
      </Grid>
    </StyledPage>
  );
}
