import { gql } from '@apollo/client';

const pricingConfigFragment = gql`
  fragment PricingConfigFragment on PricingConfig {
    id
    name
    basePriceSmall
    basePriceMedium
    basePriceLarge
    pricePerKm
    pricePerMinute
    isActive
    createdAt
    updatedAt
  }
`;

export default pricingConfigFragment;
