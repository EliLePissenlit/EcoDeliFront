import { useSnackbar } from 'notistack';

import { Container, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';
import expectedErrors from 'src/graphql/auth/expectedErrors';

import FormErrors from 'src/components/hook-form/form-errors';

import { useChangePasswordWhileLoggedInMutation } from 'src/types/graphql/typeDefs';

import {
  ResetPasswordWhileLoggedInForm,
  ResetPasswordWhileLoggedInSchemaType,
} from './form/reset-password-while-logged-in';

export default function ResetPasswordWhileLoggedIn() {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();
  const [changePasswordWhileLoggedIn, { loading, error }] = useChangePasswordWhileLoggedInMutation({
    onCompleted: () => {
      enqueueSnackbar(t('profile.reset_password_while_logged_in.success'), {
        variant: 'success',
      });
    },
  });

  const onSubmit = async (data: ResetPasswordWhileLoggedInSchemaType) => {
    await changePasswordWhileLoggedIn({
      variables: {
        input: {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
      },
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3">{t('profile.reset_password.title')}</Typography>
      <Typography variant="caption">{t('profile.reset_password.description')}</Typography>
      <FormErrors error={error} expectedErrors={[expectedErrors.INVALID_CREDENTIALS]} />

      <ResetPasswordWhileLoggedInForm onSubmit={onSubmit} loading={loading} />
    </Container>
  );
}
