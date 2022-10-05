import { gql } from "@apollo/client";

export const USER_DATA_QUERY = gql`
  query Me {
    me {
      id
      firstName
      lastName
      role
    }
  }
`;
