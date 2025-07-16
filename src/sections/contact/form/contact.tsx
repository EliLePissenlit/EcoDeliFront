import * as Yup from 'yup';
import { FC } from 'react';
import { m } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import i18n from 'src/locales/i18n';
import { useTranslate } from 'src/locales';

import { varFade } from 'src/components/animate';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';

const ContactSchema = Yup.object().shape({
  fullName: Yup.string().required(i18n.t('components.form.required')),
  email: Yup.string()
    .required(i18n.t('components.form.required'))
    .email(i18n.t('components.form.invalid_email')),
  subject: Yup.string().required(i18n.t('components.form.required')),
  message: Yup.string().required(i18n.t('components.form.required')),
});

export type ContactFormData = Yup.InferType<typeof ContactSchema>;

type ContactFormProps = {
  onSubmit: (data: ContactFormData) => Promise<void>;
  loading: boolean;
};

export const ContactForm: FC<ContactFormProps> = ({ onSubmit, loading }) => {
  const { t } = useTranslate();

  const methods = useForm<ContactFormData>({
    resolver: yupResolver(ContactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Box gap={3} display="flex" flexDirection="column" p={2}>
        <m.div variants={varFade().inUp}>
          <RHFTextField name="fullName" label={t('sections.contact.form.name')} autoFocus />
        </m.div>

        <m.div variants={varFade().inUp}>
          <RHFTextField name="email" label={t('sections.contact.form.email')} />
        </m.div>

        <m.div variants={varFade().inUp}>
          <RHFTextField name="subject" label={t('sections.contact.form.subject')} />
        </m.div>

        <m.div variants={varFade().inUp}>
          <RHFTextField
            name="message"
            label={t('sections.contact.form.message')}
            multiline
            rows={4}
          />
        </m.div>

        <m.div variants={varFade().inUp}>
          <LoadingButton fullWidth type="submit" variant="gradient" size="large" loading={loading}>
            {t('sections.contact.form.submit')}
          </LoadingButton>
        </m.div>
      </Box>
    </FormProvider>
  );
};
