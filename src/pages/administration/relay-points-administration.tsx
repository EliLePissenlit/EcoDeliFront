import { useTranslate } from 'src/locales';

import StyledPage from 'src/components/styled-page';
import StyledSectionTitle from 'src/components/styled-section-title';
import StyledSectionSubtitle from 'src/components/styled-section-subtitle';

import RelayPointsAdministration from 'src/sections/administration/relay-points/view';

export default function Page() {
  const { t } = useTranslate();
  return (
    <StyledPage title={t('pages.relayPointsAdministration.title')}>
      <StyledSectionTitle title={t('sections.relayPointsAdministration.title')} />
      <StyledSectionSubtitle subtitle={t('sections.relayPointsAdministration.description')} />
      <RelayPointsAdministration />
    </StyledPage>
  );
}
