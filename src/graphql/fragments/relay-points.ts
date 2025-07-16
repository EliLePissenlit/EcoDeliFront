import { gql } from '@apollo/client';

import openingDayFragment from './opening-day';

const relayPointFragment = gql`
  fragment RelayPointFragment on RelayPoint {
    id
    userId
    fileId
    fileUrl
    name
    description
    address {
      id
      mainText
      secondaryText
      lat
      lng
      placeId
      fullAddress
      locationType
    }
    addressId
    openingDays {
      ...OpeningDayFragment
    }
    createdAt
    updatedAt
  }
  ${openingDayFragment}
`;

export default relayPointFragment;
