import { ApolloError } from '@apollo/client';
import React, { useState, useEffect } from 'react';

import { Link, Grid, Alert, Button, Typography } from '@mui/material';

import { GraphQLError, NetworkError } from 'src/types/error';

interface FormErrorsProps {
  error:
    | {
        graphQLErrors?: GraphQLError[];
        networkError?: NetworkError;
      }
    | null
    | ApolloError
    | undefined;
  expectedErrors: {
    code: string;
    message: string;
  }[];
  severity?: 'error' | 'warning' | 'info' | 'success';
  withScrollToTop?: boolean;
  withLinkToSupportMail?: boolean;
}

const FormErrors: React.FC<FormErrorsProps> = ({
  error,
  expectedErrors,
  severity = 'error',
  withScrollToTop = false,
  withLinkToSupportMail = true,
}) => {
  const [errorMessage, setErrorMessage] = useState<string>('An error occurred.');

  useEffect(() => {
    if (!error) {
      setErrorMessage('An error occurred.');
    } else {
      let errorHandled = false;

      if (error.networkError) {
        setErrorMessage(error.networkError.message);
        errorHandled = true;
      }

      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        error.graphQLErrors.forEach((graphQLError) => {
          const expectedError = expectedErrors.find((e) => e.code === graphQLError.extensions.code);

          if (expectedError) {
            errorHandled = true;
            setErrorMessage(expectedError.message);
            if (withScrollToTop) window.scrollTo({ behavior: 'smooth', top: 0 });
          }
        });
      }

      if (!errorHandled) {
        setErrorMessage('An error occurred.');
      }
    }
  }, [error, expectedErrors, withScrollToTop]);

  if (!error) return null;

  return (
    <Grid item xs={12} sx={{ marginBottom: '16px', marginTop: '16px' }}>
      <Alert
        severity={severity}
        sx={{
          m: '0 !important',
          maxHeight: '100%',
          padding: '4px 16px !important',
        }}
        action={
          withLinkToSupportMail ? (
            <Button
              component={Link}
              href="mailto:contact@ym-growth.fr"
              underline="hover"
              size="small"
            >
              <Typography variant="caption">Contact Support</Typography>
            </Button>
          ) : null
        }
      >
        <Typography variant="caption">{errorMessage} </Typography>
      </Alert>
    </Grid>
  );
};

export default FormErrors;
