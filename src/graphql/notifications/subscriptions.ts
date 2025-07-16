import { gql } from '@apollo/client';

import { notificationFragment } from 'src/graphql/fragments';

const ON_NEW_NOTIFICATION = gql`
  subscription onNewNotification {
    onNewNotification {
      ...Notification
    }
  }
  ${notificationFragment}
`;

export { ON_NEW_NOTIFICATION };
