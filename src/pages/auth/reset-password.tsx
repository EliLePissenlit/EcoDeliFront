import { useTranslate } from 'src/locales';

import StyledPage from 'src/components/styled-page';
import StyledSectionTitle from 'src/components/styled-section-title';
import StyledSectionSubtitle from 'src/components/styled-section-subtitle';

import { ResetPassword } from 'src/sections/auth';
// ----------------------------------------------------------------------

export default function Page() {
  const { t } = useTranslate();

  return (
    <StyledPage title={t('pages.auth.reset_password.title')}>
      <StyledSectionTitle title={t('auth.reset_password.title')} />
      <StyledSectionSubtitle subtitle={t('auth.reset_password.subtitle')} />
      <ResetPassword />
    </StyledPage>
  );
}
