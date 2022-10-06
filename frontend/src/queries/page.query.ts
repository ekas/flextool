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
    }
  }
`;

export const PAGE_DELETE = gql`
  mutation deletPage($id: String!) {
    deletePage(pageId: $id) {
      id
      name
    }
  }
`;

export const PAGE_EDIT = gql`
  mutation editPage(
    $id: String!
    $name: String!
    $isPublic: Boolean!
    $definition: String!
  ) {
    editPage(
      id: $id
      name: $name
      definition: $definition
      isPublic: $isPublic
    ) {
      id
      name
      isPublic
      slug
      createdAt
      updatedAt
      definition
      userId
    }
  }
`;

export const PAGE_CREATE = gql`
  mutation createPage($slug: String!, $name: String!) {
    createPage(name: $name, definition: "{}", isPublic: false, slug: $slug) {
      id
      name
      isPublic
      slug
      createdAt
      updatedAt
      definition
      userId
    }
  }
`;
