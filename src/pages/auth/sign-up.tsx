import { useTranslate } from 'src/locales';

import StyledPage from 'src/components/styled-page';
import StyledSectionTitle from 'src/components/styled-section-title';
import StyledSectionSubtitle from 'src/components/styled-section-subtitle';

import { SignUp } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function Page() {
  const { t } = useTranslate();

  return (
    <StyledPage title={t('pages.auth.sign_up.title')}>
      <StyledSectionTitle title={t('auth.sign_up.title')} />
      <StyledSectionSubtitle subtitle={t('auth.sign_up.subtitle')} />
      <SignUp />
    </StyledPage>
  );
}
