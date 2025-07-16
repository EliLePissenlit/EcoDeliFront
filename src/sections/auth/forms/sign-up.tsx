import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';

import i18n from 'src/locales/i18n';
import { useTranslate } from 'src/locales';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

export const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .required(i18n.t('components.form.required'))
    .email(i18n.t('components.form.invalid_email')),
});

export type SignUpSchemaType = Yup.InferType<typeof SignUpSchema>;

export function SignUpForm({
  onSubmit,
  loading,
}: {
  onSubmit: (data: SignUpSchemaType) => Promise<void>;
  loading: boolean;
}) {
  const { t } = useTranslate();

  const methods = useForm<SignUpSchemaType>({
    resolver: yupResolver(SignUpSchema),
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
          InputLabelProps={{ shrink: true }}
        />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="gradient"
          loading={loading}
        >
          {t('components.button.sign_up')}
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}
