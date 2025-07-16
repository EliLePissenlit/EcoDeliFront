import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { ApolloError } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'src/hooks/use-auth';

import { logger } from 'src/services/datadog-logs';

interface ExpectedError {
  code: string;
  message: string;
}

interface UseQueryErrorsOptions {
  expectExpiredLink?: boolean;
  expectedErrors?: ExpectedError[];
  silentError?: boolean;
}

const useQueryErrors = (
  error: ApolloError | undefined | any,
  { expectExpiredLink = false, expectedErrors, silentError = false }: UseQueryErrorsOptions = {}
) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { expireUser } = useAuth();

  useEffect(() => {
    if (error) {
      const { graphQLErrors, networkError } = error;

      let errorHandled = false;

      if (networkError) {
        let networkErrorHandled = false;

        networkError.result?.errors?.forEach(
          ({ extensions, message }: { extensions: any; message: string }) => {
            errorHandled = true;

            if (extensions?.code === 'UNAUTHENTICATED') {
              networkErrorHandled = true;

              if (expectExpiredLink) {
                enqueueSnackbar('Your link has expired.', { variant: 'error' });
              } else {
                enqueueSnackbar('Authentication required.', { variant: 'error' });
                if (expireUser) expireUser();
              }
            } else if (!silentError) {
              enqueueSnackbar(message, { variant: 'error' });
            }
          }
        );

        if (networkError.statusCode > 299 && !networkErrorHandled) {
          logger.error(`[request-error] status code ${networkError.statusCode}`, { networkError });
        }

        if (!errorHandled && !silentError) {
          enqueueSnackbar(networkError.message, { variant: 'error' });
        }
      }

      if (graphQLErrors) {
        graphQLErrors.forEach(({ extensions }: { extensions: any }) => {
          if (!silentError) {
            errorHandled = true;
            const expectedError = expectedErrors?.find((e) => e.code === extensions?.code);

            if (expectedError) {
              enqueueSnackbar(expectedError.message, { variant: 'error' });
            } else {
              enqueueSnackbar('An unexpected error occurred.', { variant: 'error' });
            }
          }
        });
      }

      if (!errorHandled && !silentError) {
        logger.error('[request-error] request error unhandled');
        enqueueSnackbar('An unexpected error occurred.', { variant: 'error' });
      }
    }
  }, [
    error,
    expectExpiredLink,
    expectedErrors,
    silentError,
    enqueueSnackbar,
    expireUser,
    navigate,
  ]);
};

export default useQueryErrors;
