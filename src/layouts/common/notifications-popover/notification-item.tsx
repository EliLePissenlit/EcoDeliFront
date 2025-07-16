import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';

import { fDateTime } from 'src/utils/format-time';

import { NotificationType } from 'src/types/graphql/typeDefs';

// ----------------------------------------------------------------------

type NotificationItemProps = {
  notification: {
    id: string;
    title: string;
    createdAt: Date;
    isRead: boolean;
    type: NotificationType;
  };
};

const NOTIFICATION_ICONS = {
  [NotificationType.Message]: 'ic_chat',
  [NotificationType.InvoiceAdded]: 'ic_file',
  [NotificationType.TransactionStatusUpdated]: 'ic_order',
  [NotificationType.TaskApplicationReceived]: 'ic_order',
  [NotificationType.TaskApplicationAccepted]: 'ic_order',
  [NotificationType.TaskApplicationRejected]: 'ic_order',
  [NotificationType.TaskCompleted]: 'ic_order',
  [NotificationType.TaskValidated]: 'ic_order',
  [NotificationType.TaskStatusChanged]: 'ic_order',
} as const;

export default function NotificationItem({ notification }: NotificationItemProps) {
  const renderAvatar = (
    <ListItemAvatar>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          bgcolor: 'background.neutral',
        }}
      >
        <Box
          component="img"
          src={`/assets/icons/notification/${
            NOTIFICATION_ICONS[notification.type] || 'ic_notification'
          }.svg`}
          sx={{ width: 24, height: 24 }}
        />
      </Stack>
    </ListItemAvatar>
  );

  const renderText = (
    <ListItemText
      disableTypography
      primary={notification.title}
      secondary={
        <Stack
          direction="row"
          alignItems="center"
          sx={{ typography: 'caption', color: 'text.disabled' }}
          divider={
            <Box
              sx={{
                width: 2,
                height: 2,
                bgcolor: 'currentColor',
                mx: 0.5,
                borderRadius: '50%',
              }}
            />
          }
        >
          {fDateTime(notification.createdAt)}
        </Stack>
      }
    />
  );

  const renderUnReadBadge = !notification.isRead && (
    <Box
      sx={{
        top: 26,
        width: 8,
        height: 8,
        right: 20,
        borderRadius: '50%',
        bgcolor: 'info.main',
        position: 'absolute',
      }}
    />
  );

  return (
    <ListItemButton
      disableRipple
      sx={{
        p: 2.5,
        alignItems: 'flex-start',
        borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}
    >
      {renderUnReadBadge}

      {renderAvatar}

      <Stack sx={{ flexGrow: 1 }}>{renderText}</Stack>
    </ListItemButton>
  );
}
