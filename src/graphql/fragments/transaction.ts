import { gql } from '@apollo/client';

const transactionFragment = gql`
  fragment Transaction on Transaction {
    id
    userId
    stripeCustomerId
    stripePriceId
    stripeInvoiceId
    stripeIntentId
    stripeSubscriptionId
    amountInCents
    currency
    description
    name
    metadata
    relatedInvoice
    status
    isSubscription
    autoRenew
    trialEnd
    currentPeriodStart
    currentPeriodEnd
    canceledAt
    paidAt
    createdAt
    updatedAt
    userId
  }
`;

export default transactionFragment;
