import { Step } from 'react-joyride';

import i18n from 'src/locales/i18n';

export const profileSteps: Step[] = [
  {
    target: '[data-tab="details"]',
    content: i18n.t('walktour.profile.details.content'),
    title: i18n.t('walktour.profile.details.title'),
    disableBeacon: true,
  },
  {
    target: '[data-tab="transactions"]',
    content: i18n.t('walktour.profile.transactions.content'),
    title: i18n.t('walktour.profile.transactions.title'),
  },
  {
    target: '[data-tab="files"]',
    content: i18n.t('walktour.profile.files.content'),
    title: i18n.t('walktour.profile.files.title'),
  },
  {
    target: '[data-tab="reset_password"]',
    content: i18n.t('walktour.profile.security.content'),
    title: i18n.t('walktour.profile.security.title'),
  },
];
