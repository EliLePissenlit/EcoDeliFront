import { gql } from '@apollo/client';

const DELETE_PAYMENT_METHOD = gql`
  mutation deletePaymentMethod($paymentMethodId: ID!) {
    deletePaymentMethod(paymentMethodId: $paymentMethodId)
  }
`;

export { DELETE_PAYMENT_METHOD };
