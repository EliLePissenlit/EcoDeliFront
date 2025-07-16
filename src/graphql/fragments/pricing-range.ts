import { gql } from '@apollo/client';

const pricingRangeFragment = gql`
  fragment PricingRangeFragment on PricingRange {
    minPriceInCents
    maxPriceInCents
    estimatedDistanceInMeters
    estimatedDurationInMinutes
  }
`;

export default pricingRangeFragment;
