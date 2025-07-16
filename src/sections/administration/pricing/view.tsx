import { useState } from 'react';

import { Tab, Tabs, Container } from '@mui/material';

import { useTranslate } from 'src/locales';

import PricingConfigsView from './pricing-configs-view';
import PackageCategoriesView from './package-categories-view';

// ----------------------------------------------------------------------

export default function PricingView() {
  const { t } = useTranslate();
  const [currentTab, setCurrentTab] = useState('configs');

  const TABS = [
    {
      value: 'configs',
      label: t('sections.pricingAdministration.configs.title'),
      icon: 'mdi:cog',
    },
    {
      value: 'categories',
      label: t('sections.pricingAdministration.categories.title'),
      icon: 'mdi:tag',
    },
  ];

  return (
    <Container maxWidth={false}>
      <Tabs
        value={currentTab}
        onChange={(event, newValue) => setCurrentTab(newValue)}
        sx={{
          mx: 3,
          px: 2,
          borderRadius: 1,
          bgcolor: 'background.neutral',
        }}
      >
        {TABS.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </Tabs>

      {currentTab === 'configs' && <PricingConfigsView />}
      {currentTab === 'categories' && <PackageCategoriesView />}
    </Container>
  );
}
