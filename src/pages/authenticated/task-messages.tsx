import { format } from 'date-fns';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useRef, useMemo, useState, useEffect } from 'react';

import {
  Box,
  Card,
  Grid,
  Chip,
  Stack,
  Alert,
  Paper,
  Avatar,
  Container,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import StyledPage from 'src/components/styled-page';

import {
  MessageType,
  useGetTaskQuery,
  useGetTaskMessagesQuery,
  useSendTaskMessageMutation,
  useMarkMessagesAsReadMutation,
} from 'src/types/graphql/typeDefs';

export default function TaskMessagesPage() {
  const { t } = useTranslate();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [newMessage, setNewMessage] = useState('');

  // Récupération de la tâche
  const { data: taskData, loading: loadingTask } = useGetTaskQuery({
    variables: { id: id! },
    fetchPolicy: 'cache-and-network',
  });

  // Récupération des messages
  const {
    data: messagesData,
    loading: loadingMessages,
    refetch: refetchMessages,
  } = useGetTaskMessagesQuery({
    variables: { taskId: id! },
    fetchPolicy: 'cache-and-network',
    pollInterval: 5000, // Polling toutes les 5 secondes pour les nouveaux messages
  });

  // Mutations
  const [sendMessage, { loading: sending }] = useSendTaskMessageMutation({
    onCompleted: () => {
      setNewMessage('');
      refetchMessages();
    },
  });

  const [markAsRead] = useMarkMessagesAsReadMutation();

  const task = taskData?.getTask;
  const messages = useMemo(
    () => messagesData?.getTaskMessages || [],
    [messagesData?.getTaskMessages]
  );

  // Scroll automatique vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Marquer les messages comme lus quand on arrive sur la page
  useEffect(() => {
    if (task && messages.length > 0) {
      markAsRead({ variables: { taskId: id! } });
    }
  }, [task, messages, id, markAsRead]);

  // Handlers
  const handleSendMessage = () => {
    if (!task || !newMessage.trim() || sending) return;

    sendMessage({
      variables: {
        input: {
          taskId: task.id,
          content: newMessage.trim(),
          messageType: MessageType.Text,
          receiverId: task.userId, // Envoyer au propriétaire de la tâche
        },
      },
    });
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleBackToTask = () => {
    navigate(`/tasks/${id}`);
  };

  const getMessageTypeIcon = (messageType: MessageType) => {
    switch (messageType) {
      case MessageType.Text:
        return 'mdi:message-text';
      case MessageType.System:
        return 'mdi:cog';
      case MessageType.ValidationCode:
        return 'mdi:file-document';
      default:
        return 'mdi:message';
    }
  };

  const getMessageTypeColor = (messageType: MessageType) => {
    switch (messageType) {
      case MessageType.System:
        return 'warning';
      case MessageType.ValidationCode:
        return 'info';
      default:
        return 'default';
    }
  };

  if (loadingTask || loadingMessages) {
    return (
      <StyledPage title={t('tasks.messages.title')}>
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
            <CircularProgress size={60} />
          </Box>
        </Container>
      </StyledPage>
    );
  }

  if (!task) {
    return (
      <StyledPage title={t('tasks.messages.title')}>
        <Container maxWidth="lg">
          <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto' }}>
            {t('common.error')}
          </Alert>
        </Container>
      </StyledPage>
    );
  }

  const displayName =
    task.user.firstName && task.user.lastName
      ? `${task.user.firstName} ${task.user.lastName}`
      : 'Utilisateur';

  return (
    <StyledPage title={`${t('tasks.messages.title')} - ${task.title}`}>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          {/* En-tête */}
          <Card sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton onClick={handleBackToTask} color="primary">
                  <Iconify icon="mdi:arrow-left" />
                </IconButton>
                <Stack>
                  <Typography variant="h5" component="h1">
                    {t('tasks.messages.title')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {task.title}
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar src={task.user.avatar || undefined} alt={displayName} />
                <Typography variant="body2">
                  {t('tasks.messages.with')} {displayName}
                </Typography>
              </Stack>
            </Stack>
          </Card>

          {/* Zone de chat */}
          <Grid container spacing={3}>
            {/* Messages */}
            <Grid item xs={12}>
              <Card sx={{ height: 600, display: 'flex', flexDirection: 'column' }}>
                {/* En-tête des messages */}
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="h6">
                    {t('tasks.messages.conversation')} ({messages.length})
                  </Typography>
                </Box>

                {/* Liste des messages */}
                <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                  {messages.length === 0 ? (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      minHeight={400}
                      flexDirection="column"
                    >
                      <Iconify icon="mdi:message-outline" width={64} color="text.secondary" />
                      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                        {t('tasks.messages.no_messages')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t('tasks.messages.start_conversation')}
                      </Typography>
                    </Box>
                  ) : (
                    <Stack spacing={2}>
                      {messages.map((message) => {
                        const senderName =
                          message.sender.firstName && message.sender.lastName
                            ? `${message.sender.firstName} ${message.sender.lastName}`
                            : 'Utilisateur';

                        const isOwnMessage = message.senderId === 'current-user-id'; // À adapter selon votre système d'auth

                        return (
                          <Box
                            key={message.id}
                            sx={{
                              display: 'flex',
                              justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
                            }}
                          >
                            <Paper
                              sx={{
                                p: 2,
                                maxWidth: '70%',
                                backgroundColor: isOwnMessage ? 'primary.main' : 'background.paper',
                                color: isOwnMessage ? 'primary.contrastText' : 'text.primary',
                                border: 1,
                                borderColor: 'divider',
                              }}
                            >
                              <Stack spacing={1}>
                                {/* En-tête du message */}
                                <Stack direction="row" spacing={1} alignItems="center">
                                  {!isOwnMessage && (
                                    <Avatar
                                      src={message.sender.avatar || undefined}
                                      alt={senderName}
                                      sx={{ width: 24, height: 24 }}
                                    />
                                  )}
                                  <Typography variant="caption" color="text.secondary">
                                    {senderName}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {format(new Date(message.createdAt), 'dd/MM/yyyy à HH:mm')}
                                  </Typography>
                                  {message.messageType !== MessageType.Text && (
                                    <Chip
                                      icon={
                                        <Iconify icon={getMessageTypeIcon(message.messageType)} />
                                      }
                                      label={t(
                                        `tasks.messages.types.${message.messageType.toLowerCase()}`
                                      )}
                                      size="small"
                                      color={getMessageTypeColor(message.messageType)}
                                      variant="outlined"
                                    />
                                  )}
                                </Stack>

                                {/* Contenu du message */}
                                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                                  {message.content}
                                </Typography>

                                {/* Indicateur de lecture */}
                                {isOwnMessage && (
                                  <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                                    <Iconify
                                      icon={message.isRead ? 'mdi:check-all' : 'mdi:check'}
                                      width={16}
                                      color={message.isRead ? 'success.main' : 'text.secondary'}
                                    />
                                  </Stack>
                                )}
                              </Stack>
                            </Paper>
                          </Box>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </Stack>
                  )}
                </Box>

                {/* Zone de saisie */}
                <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                  <Stack direction="row" spacing={1}>
                    <TextField
                      fullWidth
                      multiline
                      maxRows={4}
                      placeholder={t('tasks.messages.type_message')}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={sending}
                    />
                    <IconButton
                      onClick={handleSendMessage}
                      disabled={sending || !newMessage.trim()}
                      color="primary"
                      sx={{ alignSelf: 'flex-end' }}
                    >
                      {sending ? <CircularProgress size={24} /> : <Iconify icon="mdi:send" />}
                    </IconButton>
                  </Stack>
                </Box>
              </Card>
            </Grid>

            {/* Conseils */}
            <Grid item xs={12}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  {t('tasks.messages.tips')}
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    • {t('tasks.messages.tip_1')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • {t('tasks.messages.tip_2')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • {t('tasks.messages.tip_3')}
                  </Typography>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </StyledPage>
  );
}
