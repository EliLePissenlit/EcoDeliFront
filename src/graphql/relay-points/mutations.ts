import { gql } from '@apollo/client';

import { relayPointFragment } from '../fragments';

const CREATE_RELAY_POINT = gql`
    mutation createRelayPoint($input: CreateRelayPointInput!) {
      createRelayPoint(input: $input) {
        ...RelayPointFragment
      }
      ${relayPointFragment}
    }
  `;

const UPDATE_RELAY_POINT = gql`
    mutation updateRelayPoint($id: ID!, $input: UpdateRelayPointInput!) {
      updateRelayPoint(id: $id, input: $input) {
        ...RelayPointFragment
      }
      ${relayPointFragment}
    }
  `;

const DELETE_RELAY_POINT = gql`
  mutation deleteRelayPoint($id: ID!) {
    deleteRelayPoint(id: $id)
  }
`;

export { CREATE_RELAY_POINT, UPDATE_RELAY_POINT, DELETE_RELAY_POINT };
