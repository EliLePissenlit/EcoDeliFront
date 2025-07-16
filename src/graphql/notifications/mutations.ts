import { gql } from '@apollo/client';

const MARK_ALL_NOTIFICATIONS_AS_READ = gql`
  mutation markAllNotificationsAsRead {
    markAllNotificationsAsRead
  }
`;

const CONTACT_USERS = gql`
  mutation contactUsers($input: ContactUsersInput!) {
    contactUsers(input: $input)
  }
`;

export { CONTACT_USERS, MARK_ALL_NOTIFICATIONS_AS_READ };
