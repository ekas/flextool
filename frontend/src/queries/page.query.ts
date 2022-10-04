import { gql } from "@apollo/client";

export const GET_PAGES = gql`
  query userPages {
    userPages {
      id
      name
      isPublic
      slug
      createdAt
      updatedAt
      definition
      userId
      user {
        role
        firstName
        email
      }
    }
  }
`;
