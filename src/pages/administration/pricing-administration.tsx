import { useTranslate } from 'src/locales';

import StyledPage from 'src/components/styled-page';
import StyledSectionTitle from 'src/components/styled-section-title';
import StyledSectionSubtitle from 'src/components/styled-section-subtitle';

import PricingView from 'src/sections/administration/pricing/view';

export default function Page() {
  const { t } = useTranslate();
  return (
    <StyledPage title={t('pages.pricingAdministration.title')}>
      <StyledSectionTitle title={t('sections.pricingAdministration.title')} />
      <StyledSectionSubtitle subtitle={t('sections.pricingAdministration.description')} />
      <PricingView />
    </StyledPage>
  );
}
