import { gql } from "@apollo/client";

export const GET_USER_COMMENTS = gql`
  query getUserComments {
    getUserComments {
      id
      text
      createdAt
      updatedAt
      pageId
      userId
      user {
        firstName
        lastName
      }
    }
  }
`;

export const GET_PAGE_COMMENTS = gql`
  query getPageComments($pageId: String!) {
    getPageComments(pageId: $pageId) {
      id
      text
      createdAt
      updatedAt
      pageId
      userId
      user {
        firstName
        lastName
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($pageId: String!, $text: String!) {
    addComment(pageId: $pageId, text: $text) {
      id
      text
      createdAt
      updatedAt
      pageId
      userId
      user {
        firstName
        lastName
      }
    }
  }
`;

export const EDIT_COMMENT = gql`
  mutation editComment($id: String!, $text: String!) {
    editComment(id: $id, text: $text) {
      id
      text
      createdAt
      updatedAt
      pageId
      userId
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: String!) {
    deleteComment(id: $id) {
      id
    }
  }
`;
