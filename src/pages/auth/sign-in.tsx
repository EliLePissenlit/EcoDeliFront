import { useTranslate } from 'src/locales';

import StyledPage from 'src/components/styled-page';
import StyledSectionTitle from 'src/components/styled-section-title';
import StyledSectionSubtitle from 'src/components/styled-section-subtitle';

import { SignIn } from 'src/sections/auth';
// ----------------------------------------------------------------------

export default function Page() {
  const { t } = useTranslate();

  return (
    <StyledPage title={t('pages.auth.sign_in.title')}>
      <StyledSectionTitle title={t('auth.sign_in.title')} />
      <StyledSectionSubtitle subtitle={t('auth.sign_in.subtitle')} />
      <SignIn />
    </StyledPage>
  );
}
