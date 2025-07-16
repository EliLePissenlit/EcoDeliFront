import { useTranslate } from 'src/locales';

import StyledPage from 'src/components/styled-page';
import StyledSectionTitle from 'src/components/styled-section-title';
import StyledSectionSubtitle from 'src/components/styled-section-subtitle';

import CategoriesAdministration from 'src/sections/administration/categories/view';

export default function Page() {
  const { t } = useTranslate();
  return (
    <StyledPage title={t('pages.categoriesAdministration.title')}>
      <StyledSectionTitle title={t('sections.categoriesAdministration.title')} />
      <StyledSectionSubtitle subtitle={t('sections.categoriesAdministration.description')} />
      <CategoriesAdministration />
    </StyledPage>
  );
}
