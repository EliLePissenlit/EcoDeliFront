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

import { PasswordStrength } from './password-strength';

export const ResetPasswordWhileLoggedInSchema = Yup.object().shape({
  currentPassword: Yup.string().required(i18n.t('components.form.required')),
  newPassword: Yup.string()
    .required(i18n.t('components.form.required'))
    .min(8, i18n.t('components.form.password_min_length'))
    .matches(/[0-9]/, i18n.t('components.form.password_number_required'))
    .matches(/[a-z]/, i18n.t('components.form.password_lowercase_required'))
    .matches(/[A-Z]/, i18n.t('components.form.password_uppercase_required'))
    .matches(/[^\w]/, i18n.t('components.form.password_symbol_required')),
});

export type ResetPasswordWhileLoggedInSchemaType = Yup.InferType<
  typeof ResetPasswordWhileLoggedInSchema
>;

export function ResetPasswordWhileLoggedInForm({
  onSubmit,
  loading,
}: {
  onSubmit: (data: ResetPasswordWhileLoggedInSchemaType) => Promise<void>;
  loading: boolean;
}) {
  const { t } = useTranslate();
  const password = useBoolean();
  const newPassword = useBoolean();

  const methods = useForm<ResetPasswordWhileLoggedInSchemaType>({
    resolver: yupResolver(ResetPasswordWhileLoggedInSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  const { watch } = methods;
  const newPasswordValue = watch('newPassword');

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Box gap={3} display="flex" flexDirection="column" sx={{ mt: 3 }}>
        <RHFTextField
          name="currentPassword"
          label={t('components.form.current_password')}
          type={password.value ? 'text' : 'password'}
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

        <Box gap={1} display="flex" flexDirection="column">
          <RHFTextField
            name="newPassword"
            label={t('components.form.new_password')}
            type={newPassword.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={newPassword.onToggle} edge="end">
                    <Iconify
                      icon={newPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <PasswordStrength password={newPasswordValue} />
        </Box>

        <LoadingButton fullWidth size="large" type="submit" variant="gradient" loading={loading}>
          {t('components.button.submit')}
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}
