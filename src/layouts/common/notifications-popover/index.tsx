import { m } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useAuth } from 'src/hooks/use-auth';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { useTranslate } from 'src/locales';
import { useSafeSubscription } from 'src/services/apollo-client/wrappers';
import { ON_NEW_NOTIFICATION } from 'src/graphql/notifications/subscriptions';

import { Label } from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { varHover } from 'src/components/animate';

import {
  GetNotificationsDocument,
  useGetNotificationsLazyQuery,
  useMarkAllNotificationsAsReadMutation,
} from 'src/types/graphql/typeDefs';

import NotificationItem from './notification-item';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const { t } = useTranslate();
  const drawer = useBoolean();
  const { user } = useAuth();
  const isMobile = useResponsive('down', 'sm');

  const [getNotifications, { data: notificationsData }] = useGetNotificationsLazyQuery();
  const subscriptionData = useSafeSubscription(ON_NEW_NOTIFICATION);

  useEffect(() => {
    if (user) {
      getNotifications();
    }
  }, [user, getNotifications]);

  useEffect(() => {
    if (subscriptionData?.data?.onNewNotification) {
      getNotifications();
    }
  }, [subscriptionData?.data, getNotifications]);

  const [markAllNotificationsAsRead] = useMarkAllNotificationsAsReadMutation({
    refetchQueries: [
      {
        query: GetNotificationsDocument,
      },
    ],
  });

  const [currentTab, setCurrentTab] = useState('all');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const TABS = [
    {
      value: 'all',
      label: t('notifications.all'),
      count: notificationsData?.getNotifications.length,
    },
    {
      value: 'unread',
      label: t('notifications.unread'),
      count: notificationsData?.getNotifications.filter((notification) => !notification.isRead)
        .length,
    },
    {
      value: 'archived',
      label: t('notifications.archived'),
      count: notificationsData?.getNotifications.filter((notification) => notification.isRead)
        .length,
    },
  ];

  const notifications = notificationsData?.getNotifications;
  const totalUnRead = notifications?.filter((notification) => !notification.isRead).length;

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead();
    drawer.onFalse();
  };

  const renderHead = (
    <Stack direction="row" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        {t('notifications.title')}
      </Typography>

      {!!totalUnRead && (
        <Tooltip title={t('notifications.mark_all_as_read')}>
          <IconButton color="success" onClick={handleMarkAllAsRead}>
            <Iconify icon="eva:done-all-fill" />
          </IconButton>
        </Tooltip>
      )}

      <IconButton onClick={drawer.onFalse}>
        <Iconify icon="mingcute:close-line" color="text.primary" />
      </IconButton>
    </Stack>
  );

  const renderTabs = (
    <Tabs value={currentTab} onChange={handleChangeTab}>
      {TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            <Label
              variant="filled"
              color={
                (tab.value === 'unread' && 'warning') ||
                (tab.value === 'archived' && 'success') ||
                'default'
              }
            >
              <Typography
                variant="caption"
                color={tab.value === 'all' ? 'text.secondary' : 'text.primary'}
              >
                {tab.count}
              </Typography>
            </Label>
          }
          sx={{
            '&:not(:last-of-type)': {
              mr: 3,
            },
          }}
        />
      ))}
    </Tabs>
  );

  const renderList = (
    <Scrollbar>
      <List disablePadding>
        {notifications
          ?.filter((notification) => {
            if (currentTab === 'unread') return !notification.isRead;
            if (currentTab === 'archived') return notification.isRead;
            return true; // 'all' tab
          })
          .map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
      </List>
    </Scrollbar>
  );

  if (!user) return null;

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        color={drawer.value ? 'primary' : 'default'}
        onClick={drawer.onTrue}
      >
        <Badge
          badgeContent={
            totalUnRead ? <Typography variant="caption">{totalUnRead}</Typography> : null
          }
          color="error"
        >
          <Iconify icon="solar:bell-bing-bold-duotone" width={24} />
        </Badge>
      </IconButton>

      <Drawer
        open={drawer.value}
        onClose={drawer.onFalse}
        anchor="right"
        slotProps={{
          backdrop: { invisible: !isMobile },
        }}
        PaperProps={{
          sx: {
            width: {
              xs: 1,
              sm: 420,
            },
            maxWidth: '100%',
          },
        }}
      >
        {renderHead}
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pl: 2.5, pr: 1 }}
        >
          {renderTabs}
        </Stack>
        <Divider />
        {renderList}
      </Drawer>
    </>
  );
}
