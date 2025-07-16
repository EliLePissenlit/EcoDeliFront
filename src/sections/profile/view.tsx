import { useEffect } from 'react';

import { Tab, Box, Tabs, Stack, Select, MenuItem, Container, useMediaQuery } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useRouter } from 'src/hooks/use-router';

import { addParams, getParams } from 'src/utils/url';
import { setCookie, getCookieValue } from 'src/utils/cookies';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import Walktour from 'src/components/walktour';
import { useWalktour } from 'src/components/walktour/use-walktour';

import Details from './details/view';
import { FilesView } from './files/view';
import { profileSteps } from './config-steps';
import Transactions from './transactions/view';
import ResetPassword from './reset-password-while-logged-in/view';

export default function Profile() {
  const { t } = useTranslate();
  const router = useRouter();
  const tab = getParams('tab') || 'details';
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  const TABS = [
    {
      value: 'details',
      label: t('profile.details.title'),
      component: <Details />,
      icon: 'mdi:account',
      path: `${paths.profile}?tab=details`,
    },
    {
      value: 'transactions',
      label: t('profile.transactions.title'),
      component: <Transactions />,
      icon: 'mdi:cash-clock',
      path: `${paths.profile}?tab=transactions`,
    },
    {
      value: 'files',
      label: t('profile.files.title'),
      component: <FilesView />,
      icon: 'mdi:file',
      path: `${paths.profile}?tab=files`,
    },
    {
      value: 'reset_password',
      label: t('profile.reset_password.title'),
      component: <ResetPassword />,
      icon: 'mdi:lock',
      path: `${paths.profile}?tab=reset_password`,
    },
  ];

  const handleTabChange = (_: any, newValue: string) => {
    router.push(addParams(paths.profile, { tab: newValue }));
  };

  const handleSelectChange = (event: any) => {
    router.push(addParams(paths.profile, { tab: event.target.value }));
  };

  const { run, steps, setRun, onCallback, setHelpers } = useWalktour({
    steps: profileSteps,
    showProgress: true,
  });

  useEffect(() => {
    const hasSeenProfileTour = getCookieValue('has_seen_profile_tour');
    if (!hasSeenProfileTour) {
      setRun(true);
      setCookie('has_seen_profile_tour', 'true', 30);
    }
  }, [setRun]);

  useEffect(() => {
    if (!tab) {
      router.push(addParams(paths.profile, { tab: 'details' }));
    }
  }, [tab, router]);

  return (
    <Container>
      <Walktour
        run={run}
        steps={steps}
        callback={onCallback}
        getHelpers={setHelpers}
        continuous
        showSkipButton
        hideCloseButton
        disableScrolling={false}
        locale={{
          back: t('common.back'),
          close: t('common.close'),
          last: t('common.finish'),
          next: t('common.next'),
          skip: t('common.skip'),
        }}
      />

      <Stack spacing={3} alignItems="start" justifyContent="center">
        {isMobile ? (
          <Select
            value={tab}
            onChange={handleSelectChange}
            fullWidth
            sx={{
              bgcolor: 'background.paper',
              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              },
            }}
          >
            {TABS.map((tabItem) => (
              <MenuItem
                key={tabItem.value}
                value={tabItem.value}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Iconify icon={tabItem.icon} />
                {tabItem.label}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Tabs
            value={tab}
            onChange={handleTabChange}
            sx={{ px: 0, bgcolor: 'transparent', width: '100%' }}
          >
            {TABS.map((tabItem) => (
              <Tab
                icon={<Iconify icon={tabItem.icon} />}
                key={tabItem.value}
                value={tabItem.value}
                label={tabItem.label}
                data-tab={tabItem.value}
              />
            ))}
          </Tabs>
        )}
      </Stack>

      {TABS.map(
        (tabItem) =>
          tabItem.value === tab && (
            <Box key={tabItem.value} sx={{ mt: 5 }}>
              {tabItem.component}
            </Box>
          )
      )}
    </Container>
  );
}
