import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
  mutation userLogin($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      accessToken
      refreshToken
      user {
        role
      }
    }
  }
`;

export const USER_SIGNUP = gql`
  mutation userSignUp(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signup(
      data: {
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      accessToken
      refreshToken
    }
  }
`;

export const USER_DATA_QUERY = gql`
  query Me {
    me {
      id
      role
    }
  }
`;
