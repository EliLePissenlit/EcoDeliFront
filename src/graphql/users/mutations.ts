import { gql } from '@apollo/client';

import { userFragment } from 'src/graphql/fragments';

const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      ...User
    }
  }
  ${userFragment}
`;

const SUSPEND_USER = gql`
  mutation suspendUser($id: ID!) {
    suspendUser(id: $id) {
      ...User
    }
  }
  ${userFragment}
`;

const SAVE_LAST_POSITION = gql`
  mutation saveLastPosition($input: AddressInput!) {
    saveLastPosition(input: $input) {
      ...User
    }
  }
  ${userFragment}
`;

export { UPDATE_USER, SUSPEND_USER, SAVE_LAST_POSITION };
