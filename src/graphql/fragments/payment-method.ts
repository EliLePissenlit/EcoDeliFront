/* type PaymentMethod {
    id: ID!
    brand: String!
    last4: String!
    expiryMonth: Int!
    expiryYear: Int!
    isDefault: Boolean!
  }
   */

import { gql } from '@apollo/client';

const paymentMethodFragment = gql`
  fragment PaymentMethod on PaymentMethod {
    id
    brand
    last4
    expiryMonth
    expiryYear
    isDefault
  }
`;

export default paymentMethodFragment;
