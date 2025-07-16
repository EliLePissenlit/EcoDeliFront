import { useSnackbar } from 'notistack';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useAuth } from 'src/hooks/use-auth';

import { useTranslate } from 'src/locales';
import expectedErrors from 'src/graphql/auth/expectedErrors';

import { FormDivider } from 'src/components/form-divider';
import { FormSocials } from 'src/components/form-socials';
import FormErrors from 'src/components/hook-form/form-errors';
import { FormRedirectLink } from 'src/components/form-redirect-link';

import { useLoginMutation } from 'src/types/graphql/typeDefs';

import { SignInForm, SignInSchemaType } from './forms/sign-in';

export function SignIn() {
  const { onLoginSuccess } = useAuth();
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();

  const [loginMutation, { loading, error }] = useLoginMutation({
    onCompleted: (data) => {
      enqueueSnackbar(t('auth.sign_in.success_message'), {
        variant: 'success',
      });
      onLoginSuccess(data.login.token);
    },
  });

  const handleSubmit = async (data: SignInSchemaType) => {
    await loginMutation({
      variables: {
        input: {
          email: data.email,
          password: data.password,
        },
      },
    });
  };

  return (
    <Container maxWidth="sm">
      <FormErrors
        error={error}
        expectedErrors={[expectedErrors.INVALID_CREDENTIALS, expectedErrors.ACCOUNT_SUSPENDED]}
      />

      <SignInForm onSubmit={handleSubmit} loading={loading} />

      <FormRedirectLink
        text={t('auth.sign_in.redirect_link.text')}
        linkText={t('auth.sign_in.redirect_link.link_text')}
        href={paths.auth.signUp}
      />

      <FormRedirectLink
        text={t('auth.sign_in.redirect_link.forgot_password')}
        linkText={t('auth.sign_in.redirect_link.forgot_password_link_text')}
        href={paths.auth.resetPassword}
      />

      <FormDivider />

      <FormSocials signInWithGoogle={() => {}} />
    </Container>
  );
}
