import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useBoolean } from 'src/hooks/use-boolean';

import i18n from 'src/locales/i18n';
import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .required(i18n.t('components.form.required'))
    .email(i18n.t('components.form.invalid_email')),
  password: Yup.string()
    .required(i18n.t('components.form.required'))
    .min(6, i18n.t('components.form.password_too_short')),
});

export type SignInSchemaType = Yup.InferType<typeof SignInSchema>;

export function SignInForm({
  onSubmit,
  loading,
}: {
  onSubmit: (data: SignInSchemaType) => Promise<void>;
  loading: boolean;
}) {
  const { t } = useTranslate();

  const password = useBoolean();

  const methods = useForm<SignInSchemaType>({
    resolver: yupResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Box gap={3} display="flex" flexDirection="column">
        <RHFTextField name="email" label={t('components.form.email')} />
        <RHFTextField
          name="password"
          placeholder={t('components.form.password_placeholder')}
          type={password.value ? 'text' : 'password'}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton type="submit" fullWidth variant="gradient" loading={loading} size="large">
          {t('components.button.sign_in')}
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}
