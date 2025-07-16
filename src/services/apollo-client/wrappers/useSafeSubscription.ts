import {
  DocumentNode,
  useSubscription,
  TypedDocumentNode,
  OperationVariables,
} from '@apollo/client';

const useSafeSubscription = (
  query: DocumentNode | TypedDocumentNode<any, OperationVariables>,
  queryOptions?: any
) => {
  try {
    return useSubscription(query, queryOptions);
  } catch {
    // Nothing to do
    return null;
  }
};

export default useSafeSubscription;
