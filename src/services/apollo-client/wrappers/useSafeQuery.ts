import { useQuery, DocumentNode, TypedDocumentNode, OperationVariables } from '@apollo/client';

import useQueryErrors from './useQueryErrors';

const useSafeQuery = (
  query: DocumentNode | TypedDocumentNode<any, OperationVariables>,
  queryOptions: {},
  errorsOptions = {}
) => {
  const { error, ...queryResult } = useQuery(query, queryOptions);
  useQueryErrors(error, errorsOptions);

  return { error, ...queryResult };
};

export default useSafeQuery;
