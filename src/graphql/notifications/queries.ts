import { gql } from '@apollo/client';

import { notificationFragment } from 'src/graphql/fragments';

const GET_NOTIFICATIONS = gql`
  query getNotifications {
    getNotifications {
      ...Notification
    }
  }
  ${notificationFragment}
`;

export { GET_NOTIFICATIONS };
