import { gql } from '@apollo/client';

const packageCategoryInfoFragment = gql`
  fragment PackageCategoryInfoFragment on PackageCategoryInfo {
    category
    description
    maxVolume
    maxWeight
    emoji
  }
`;

export default packageCategoryInfoFragment;
