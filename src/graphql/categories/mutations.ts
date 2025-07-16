/* type Mutation {
    createCategory(input: CreateCategoryInput!): Category
    updateCategory(id: ID!, input: UpdateCategoryInput!): Category
    deleteCategory(id: ID!): Boolean
  } */

import { gql } from '@apollo/client';

import categoryFragment from '../fragments/category';

const CREATE_CATEGORY = gql`
  mutation createCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      ...CategoryFragment
    }
  }
  ${categoryFragment}
`;

const UPDATE_CATEGORY = gql`
  mutation updateCategory($id: ID!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      ...CategoryFragment
    }
  }
  ${categoryFragment}
`;

const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;

export { CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY };
