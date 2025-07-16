import { useSnackbar } from 'notistack';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useRouter } from 'src/hooks/use-router';

import { useTranslate } from 'src/locales';
import expectedErrors from 'src/graphql/auth/expectedErrors';

import { FormDivider } from 'src/components/form-divider';
import { FormSocials } from 'src/components/form-socials';
import FormErrors from 'src/components/hook-form/form-errors';
import { FormRedirectLink } from 'src/components/form-redirect-link';

import { useRegisterMutation } from 'src/types/graphql/typeDefs';

import { SignUpForm, SignUpSchemaType } from './forms/sign-up';

// ----------------------------------------------------------------------

export function SignUp() {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslate();
  const router = useRouter();

  const [registerMutation, { loading, error }] = useRegisterMutation({
    onCompleted: (data) => {
      enqueueSnackbar(t('auth.sign_up.success_message'), {
        variant: 'success',
      });
      router.push(paths.auth.signIn);
    },
  });

  const handleSubmit = async (data: SignUpSchemaType) => {
    await registerMutation({
      variables: {
        input: {
          email: data.email,
        },
      },
    });
  };

  return (
    <Container maxWidth="sm">
      <FormErrors error={error} expectedErrors={[expectedErrors.USER_ALREADY_EXISTS]} />

      <SignUpForm onSubmit={handleSubmit} loading={loading} />

      <FormRedirectLink
        text={t('auth.sign_up.redirect_link.text')}
        linkText={t('auth.sign_up.redirect_link.link_text')}
        href={paths.auth.signIn}
      />

      <FormDivider />

      <FormSocials signInWithGoogle={() => {}} />
    </Container>
  );
}
