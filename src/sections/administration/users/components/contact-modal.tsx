import React from 'react';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import { useTranslate } from 'src/locales';

import Editor from 'src/components/editor';

// ----------------------------------------------------------------------

type ContactModalProps = {
  open: boolean;
  message: string;
  selectedCount: number;
  onClose: () => void;
  onMessageChange: (message: string) => void;
  onSend: () => void;
};

export default function ContactModal({
  open,
  message,
  selectedCount,
  onClose,
  onMessageChange,
  onSend,
}: ContactModalProps) {
  const { t } = useTranslate();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{t('sections.usersAdministration.modal.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          {t('sections.usersAdministration.modal.description', {
            count: selectedCount,
          })}
        </DialogContentText>
        <Editor
          value={message}
          onChange={onMessageChange}
          placeholder={t('sections.usersAdministration.modal.message')}
          sx={{ minHeight: 200 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('sections.usersAdministration.modal.cancel')}</Button>
        <Button onClick={onSend} variant="gradient" color="primary" disabled={!message.trim()}>
          {t('sections.usersAdministration.modal.send')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
