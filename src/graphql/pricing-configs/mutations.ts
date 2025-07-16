import { gql } from '@apollo/client';

import pricingConfigFragment from '../fragments/pricing-config';

const CREATE_PRICING_CONFIG = gql`
  mutation createPricingConfig($input: CreatePricingConfigInput!) {
    createPricingConfig(input: $input) {
      ...PricingConfigFragment
    }
  }
  ${pricingConfigFragment}
`;

const ACTIVATE_PRICING_CONFIG = gql`
  mutation activatePricingConfig($id: ID!) {
    activatePricingConfig(id: $id)
  }
`;

const DEACTIVATE_PRICING_CONFIG = gql`
  mutation deactivatePricingConfig($id: ID!) {
    deactivatePricingConfig(id: $id)
  }
`;

export { CREATE_PRICING_CONFIG, ACTIVATE_PRICING_CONFIG, DEACTIVATE_PRICING_CONFIG };
