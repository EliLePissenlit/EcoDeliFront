import { gql } from '@apollo/client';

import transactionFragment from '../fragments/transaction';

const GET_TRANSACTION = gql`
  query getTransaction($id: ID!) {
    getTransaction(id: $id) {
      ...Transaction
    }
  }
  ${transactionFragment}
`;

const GET_USER_TRANSACTIONS = gql`
  query getUserTransactions {
    getUserTransactions {
      ...Transaction
    }
  }
  ${transactionFragment}
`;

const GET_ACTIVE_SUBSCRIPTIONS = gql`
  query getActiveSubscriptions {
    getActiveSubscriptions {
      ...Transaction
    }
  }
  ${transactionFragment}
`;

export { GET_TRANSACTION, GET_USER_TRANSACTIONS, GET_ACTIVE_SUBSCRIPTIONS };
