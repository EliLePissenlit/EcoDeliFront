import { useSnackbar } from 'notistack';

import { Container } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import { FormReturnLink } from 'src/components/form-return-link';

import { useResetPasswordAndSendItByEmailMutation } from 'src/types/graphql/typeDefs';

import { ResetPasswordForm, ResetPasswordSchemaType } from './forms/reset-password';

export function ResetPassword() {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslate();

  const [resetPasswordMutation, { loading }] = useResetPasswordAndSendItByEmailMutation({
    onCompleted: () => {
      enqueueSnackbar(t('auth.reset_password.success_message'), { variant: 'success' });
    },
  });

  const handleSubmit = async (data: ResetPasswordSchemaType) => {
    await resetPasswordMutation({
      variables: {
        input: {
          email: data.email,
        },
      },
    });
  };

  return (
    <Container maxWidth="sm">
      <ResetPasswordForm onSubmit={handleSubmit} loading={loading} />

      <FormReturnLink href={paths.auth.signIn} />
    </Container>
  );
}
