import { gql } from '@apollo/client';

import pricingRangeFragment from '../fragments/pricing-range';
import packageCategoryInfoFragment from '../fragments/package-category-info';

const GET_PACKAGE_CATEGORIES = gql`
  query getPackageCategories {
    getPackageCategories {
      ...PackageCategoryInfoFragment
    }
  }
  ${packageCategoryInfoFragment}
`;

const CALCULATE_PRICE_RANGE_FROM_GEO_DATA = gql`
  query calculatePriceRangeFromGeoData($input: GeoPricingInput!) {
    calculatePriceRangeFromGeoData(input: $input) {
      ...PricingRangeFragment
    }
  }
  ${pricingRangeFragment}
`;

export { GET_PACKAGE_CATEGORIES, CALCULATE_PRICE_RANGE_FROM_GEO_DATA };
