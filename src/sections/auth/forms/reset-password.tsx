import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';

import i18n from 'src/locales/i18n';
import { useTranslate } from 'src/locales';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

export const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required(i18n.t('components.form.required'))
    .email(i18n.t('components.form.invalid_email')),
});

export type ResetPasswordSchemaType = Yup.InferType<typeof ResetPasswordSchema>;

export function ResetPasswordForm({
  onSubmit,
  loading,
}: {
  onSubmit: (data: ResetPasswordSchemaType) => Promise<void>;
  loading: boolean;
}) {
  const { t } = useTranslate();

  const methods = useForm<ResetPasswordSchemaType>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Box gap={3} display="flex" flexDirection="column">
        <RHFTextField
          name="email"
          label={t('components.form.email')}
          placeholder={t('components.form.email_placeholder')}
          autoFocus
          InputLabelProps={{ shrink: true }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="gradient" loading={loading}>
          {t('components.button.submit')}
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}
