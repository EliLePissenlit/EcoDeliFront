import { gql } from '@apollo/client';

const notificationFragment = gql`
  fragment Notification on Notification {
    id
    title
    createdAt
    isRead
    updatedAt
    type
  }
`;

export default notificationFragment;
