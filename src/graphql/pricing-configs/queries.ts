import { gql } from '@apollo/client';

import pricingConfigFragment from '../fragments/pricing-config';

const PRICING_CONFIGS = gql`
  query pricingConfigs {
    pricingConfigs {
      ...PricingConfigFragment
    }
  }
  ${pricingConfigFragment}
`;

const ACTIVE_PRICING_CONFIG = gql`
  query activePricingConfig {
    activePricingConfig {
      ...PricingConfigFragment
    }
  }
  ${pricingConfigFragment}
`;

export { PRICING_CONFIGS, ACTIVE_PRICING_CONFIG };
