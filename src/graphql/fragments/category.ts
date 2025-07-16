import { gql } from '@apollo/client';

const categoryFragment = gql`
  fragment CategoryFragment on Category {
    id
    name
    color
    fileId
    fileUrl
    createdAt
    description
    amountInCents
    updatedAt
  }
`;

export default categoryFragment;
