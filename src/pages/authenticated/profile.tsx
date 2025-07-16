import { useTranslate } from 'src/locales';

import StyledPage from 'src/components/styled-page';

import Profile from 'src/sections/profile/view';

export default function Page() {
  const { t } = useTranslate();
  return (
    <StyledPage title={t('pages.profile.title')}>
      <Profile />
    </StyledPage>
  );
}
