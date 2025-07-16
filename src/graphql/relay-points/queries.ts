import { gql } from '@apollo/client';

import { relayPointFragment } from '../fragments';

const RELAY_POINTS = gql`
    query relayPoints {
      relayPoints {
        ...RelayPointFragment
      }
      ${relayPointFragment}
    }
  `;

const RELAY_POINT = gql`
    query relayPoint($id: ID!) {
      relayPoint(id: $id) {
        ...RelayPointFragment
      }
      ${relayPointFragment}
    }
  `;

export { RELAY_POINT, RELAY_POINTS };
