import { DocumentNode, useLazyQuery, TypedDocumentNode, OperationVariables } from '@apollo/client';

import useQueryErrors from './useQueryErrors';

const useSafeLazyQuery = (
  query: DocumentNode | TypedDocumentNode<any, OperationVariables>,
  queryOptions: {},
  errorsOptions = {}
) => {
  const [lazyQuery, { error, ...queryResult }] = useLazyQuery(query, queryOptions);
  useQueryErrors(error, errorsOptions);

  return [lazyQuery, { error, ...queryResult }];
};

export default useSafeLazyQuery;
