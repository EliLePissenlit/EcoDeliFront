import { useSnackbar } from 'notistack';
import { useMutation, DocumentNode, TypedDocumentNode, OperationVariables } from '@apollo/client';

import useQueryErrors from './useQueryErrors';

interface UseSafeMutationOptions {
  displaySnackbar?: boolean;
  onCompleted?: (data: any) => void;
}

const useSafeMutation = (
  query: DocumentNode | TypedDocumentNode<any, OperationVariables>,
  queryOptions: UseSafeMutationOptions = {},
  errorsOptions = {}
) => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    displaySnackbar = true,
    onCompleted: customOnCompleted,
    ...restQueryOptions
  } = queryOptions;

  const onCompleted = (data: any) => {
    if (customOnCompleted) {
      customOnCompleted(data);
    }
    if (displaySnackbar) {
      enqueueSnackbar('Success', { variant: 'success' });
    }
  };

  const [mutation, { error, ...queryResult }] = useMutation(query, {
    ...restQueryOptions,
    onCompleted,
  });

  useQueryErrors(error, { silentError: true, ...errorsOptions });

  return [mutation, { error, ...queryResult }];
};

export default useSafeMutation;
