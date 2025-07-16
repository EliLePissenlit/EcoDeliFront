import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useAuth } from 'src/hooks/use-auth';

import { useTranslate } from 'src/locales';

import SvgColor from 'src/components/svg-color';
import Iconify from 'src/components/iconify/iconify';

import { Role } from 'src/types/graphql/typeDefs';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { user } = useAuth();
  const { t } = useTranslate();

  const data = useMemo(() => {
    const baseData: any = [
      {
        items: [
          {
            title: t('layout.navbar.dashboard'),
            icon: ICONS.dashboard,
            path: paths.dashboard,
            tag: t('layout.navbar.tags.dashboard'),
          },
        ],
      },
    ];

    if (user) {
      // Section Tâches pour tous les utilisateurs connectés
      const tasksData = {
        items: [
          {
            title: t('layout.navbar.tasks'),
            icon: <Iconify icon="mdi:clipboard-list" />,
            path: paths.tasks.root,
            children: [
              {
                title: t('layout.navbar.tasks_list'),
                path: paths.tasks.list,
                icon: <Iconify icon="mdi:format-list-bulleted" />,
                tag: t('layout.navbar.tags.tasks_list'),
              },
              {
                title: t('layout.navbar.create_task'),
                path: paths.tasks.create,
                icon: <Iconify icon="mdi:plus-circle" />,
                tag: t('layout.navbar.tags.create_task'),
              },
            ],
          },
        ],
      };
      baseData.push(tasksData);

      const accountData = {
        items: [
          {
            title: t('layout.navbar.my_account'),
            icon: ICONS.user,
            path: paths.profile,
            children: [
              {
                title: t('profile.details.title'),
                path: `${paths.profile}?tab=details`,
                icon: <Iconify icon="mdi:account" />,
                tag: t('layout.navbar.tags.profile_details'),
              },
              {
                title: t('profile.transactions.title'),
                path: `${paths.profile}?tab=transactions`,
                icon: <Iconify icon="mdi:cash-clock" />,
                tag: t('layout.navbar.tags.profile_transactions'),
              },
              {
                title: t('profile.files.title'),
                path: `${paths.profile}?tab=files`,
                icon: <Iconify icon="mdi:file" />,
                tag: t('layout.navbar.tags.profile_files'),
              },
              {
                title: t('profile.reset_password.title'),
                path: `${paths.profile}?tab=reset_password`,
                icon: <Iconify icon="mdi:lock" />,
                tag: t('layout.navbar.tags.profile_password'),
              },
            ],
          },
        ],
      };
      baseData.push(accountData);
    }

    if (user.role === Role.Admin || user.role === Role.SuperAdmin) {
      const administrationData = {
        items: [
          {
            title: t('layout.navbar.administration'),
            icon: ICONS.analytics,
            path: paths.administration.users,
            children: [
              {
                title: t('layout.navbar.users'),
                path: paths.administration.users,
                icon: ICONS.user,
              },
              {
                title: t('layout.navbar.categories'),
                path: paths.administration.categories,
                icon: <Iconify icon="mdi:tag" />,
              },
              {
                title: t('layout.navbar.pricing'),
                path: paths.administration.pricing,
                icon: <Iconify icon="mdi:currency-usd" />,
              },
              {
                title: t('layout.navbar.relay_points'),
                path: paths.administration.relayPoints,
                icon: <Iconify icon="mdi:map-marker" />,
              },
              {
                title: t('layout.navbar.tasks_admin'),
                path: paths.administration.tasks,
                icon: <Iconify icon="mdi:clipboard-check" />,
              },
            ],
          },
        ],
      };
      baseData.push(administrationData);
    }

    return baseData;
  }, [user, t]);

  return data;
}
