import { gql } from '@apollo/client';

import transactionFragment from '../fragments/transaction';

const CREATE_CUSTOM_PAYMENT = gql`
  mutation createCustomPayment($input: CreateCustomPaymentInput!) {
    createCustomPayment(input: $input) {
      clientSecret
      intentId
    }
  }
`;

const CREATE_SUBSCRIPTION = gql`
  mutation createSubscription($input: CreateSubscriptionInput!) {
    createSubscription(input: $input) {
      clientSecret
      intentId
      transaction {
        ...Transaction
      }
    }
  }
  ${transactionFragment}
`;

const CANCEL_SUBSCRIPTION = gql`
  mutation cancelSubscription($input: CancelSubscriptionInput!) {
    cancelSubscription(input: $input) {
      ok
      message
    }
  }
`;

export { CREATE_SUBSCRIPTION, CANCEL_SUBSCRIPTION, CREATE_CUSTOM_PAYMENT };
