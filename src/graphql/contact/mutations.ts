import { gql } from '@apollo/client';

const CONTACT_US = gql`
  mutation contactUs($input: ContactUsInput!) {
    contactUs(input: $input)
  }
`;

export { CONTACT_US };
