import { useSnackbar } from 'notistack';

import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';

import { useContactUsMutation } from 'src/types/graphql/typeDefs';

import { ContactForm, ContactFormData } from './form/contact';

// ----------------------------------------------------------------------

type ContactDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function ContactDialog({ open, onClose }: ContactDialogProps) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslate();

  const [contactUs, { loading }] = useContactUsMutation({
    onCompleted: () => {
      enqueueSnackbar(t('sections.contact.form.success_message'), { variant: 'success' });
      onClose();
    },
  });

  const handleSubmit = async (data: ContactFormData) => {
    await contactUs({
      variables: {
        input: data,
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {t('sections.contact.title')}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Iconify icon="eva:close-fill" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <ContactForm onSubmit={handleSubmit} loading={loading} />
      </DialogContent>
    </Dialog>
  );
}
