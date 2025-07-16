import { useTranslate } from 'src/locales';

import StyledPage from 'src/components/styled-page';
import StyledSectionTitle from 'src/components/styled-section-title';
import StyledSectionSubtitle from 'src/components/styled-section-subtitle';

import UsersAdministration from 'src/sections/administration/users/view';

export default function Page() {
  const { t } = useTranslate();
  return (
    <StyledPage title={t('pages.usersAdministration.title')}>
      <StyledSectionTitle title={t('sections.usersAdministration.title')} />
      <StyledSectionSubtitle subtitle={t('sections.usersAdministration.description')} />
      <UsersAdministration />
    </StyledPage>
  );
}
