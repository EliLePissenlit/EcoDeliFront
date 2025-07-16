import { gql } from '@apollo/client';

import { userFragment } from 'src/graphql/fragments';

const CURRENT_USER = gql`
  query me {
    me {
      ...User
    }
  }
  ${userFragment}
`;

const LIST_USERS = gql`
  query listUsers {
    listUsers {
      ...User
    }
  }
  ${userFragment}
`;

export { LIST_USERS, CURRENT_USER };
