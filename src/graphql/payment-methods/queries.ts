import { gql } from '@apollo/client';

import { paymentMethodFragment } from 'src/graphql/fragments';

const GET_USER_PAYMENT_METHODS = gql`
  query getUserPaymentMethods {
    getUserPaymentMethods {
      ...PaymentMethod
    }
  }
  ${paymentMethodFragment}
`;

export { GET_USER_PAYMENT_METHODS };
