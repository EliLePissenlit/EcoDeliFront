import { gql } from '@apollo/client';

const userFragment = gql`
  fragment User on User {
    id
    email
    firstName
    lastName
    phone
    stripeCustomerId
    role
    password
    passwordUpdatedAt
    isUserEmailVerified
    isSuspended
    avatar
    isUnderSurveillance
    lastLoginAt
    createdAt
    updatedAt
  }
`;

export default userFragment;
