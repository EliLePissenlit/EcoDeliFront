import { gql } from '@apollo/client';

const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;

const REGISTER = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input)
  }
`;

const CHANGE_PASSWORD_WHILE_LOGGED_IN = gql`
  mutation changePasswordWhileLoggedIn($input: ChangePasswordInput!) {
    changePasswordWhileLoggedIn(input: $input) {
      token
    }
  }
`;

const RESET_PASSWORD_AND_SEND_IT_BY_EMAIL = gql`
  mutation resetPasswordAndSendItByEmail($input: ResetPasswordInput!) {
    resetPasswordAndSendItByEmail(input: $input)
  }
`;

export { LOGIN, REGISTER, CHANGE_PASSWORD_WHILE_LOGGED_IN, RESET_PASSWORD_AND_SEND_IT_BY_EMAIL };
