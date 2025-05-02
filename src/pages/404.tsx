import { useTranslate } from 'src/locales';

import StyledPage from 'src/components/styled-page';

import { NotFoundView } from 'src/sections/error';

export default function NotFoundPage() {
  const { t } = useTranslate();
  return (
    <StyledPage title={t('pages.404.title')}>
      <NotFoundView />
    </StyledPage>
  );
}
