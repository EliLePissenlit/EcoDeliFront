import { gql } from '@apollo/client';

import categoryFragment from '../fragments/category';

const GET_CATEGORY = gql`
  query getCategory($id: ID!) {
    getCategory(id: $id) {
      ...CategoryFragment
    }
  }
  ${categoryFragment}
`;

const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      ...CategoryFragment
    }
  }
  ${categoryFragment}
`;

export { GET_CATEGORY, GET_CATEGORIES };
