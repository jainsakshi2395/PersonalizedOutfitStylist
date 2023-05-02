/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNewuser = /* GraphQL */ `
  query GetNewuser($id: ID!) {
    getNewuser(id: $id) {
      id
      username
      password
      email
      createdAt
      updatedAt
    }
  }
`;
export const listNewusers = /* GraphQL */ `
  query ListNewusers(
    $filter: ModelNewuserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNewusers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        password
        email
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
