import { gql } from "@apollo/client";

export const PRINT_HELLO_WORLd_QUERY = gql`
  query helloName {
    hello(name: "Ekas")
  }
`;
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

export const USER_DATA_QUERY = gql`
  query Me {
    me {
      id
      email
      firstName
      lastName
      role
    }
  }
`;
