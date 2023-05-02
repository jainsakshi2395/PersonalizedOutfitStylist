/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const createNewuser = /* GraphQL */ `
  mutation CreateNewuser(
    $input: CreateNewuserInput!
    $condition: ModelNewuserConditionInput
  ) {
    createNewuser(input: $input, condition: $condition) {
      id
      username
      password
      email
      createdAt
      updatedAt
    }
  }
`;
export const updateNewuser = /* GraphQL */ `
  mutation UpdateNewuser(
    $input: UpdateNewuserInput!
    $condition: ModelNewuserConditionInput
  ) {
    updateNewuser(input: $input, condition: $condition) {
      id
      username
      password
      email
      createdAt
      updatedAt
    }
  }
`;
export const deleteNewuser = /* GraphQL */ `
  mutation DeleteNewuser(
    $input: DeleteNewuserInput!
    $condition: ModelNewuserConditionInput
  ) {
    deleteNewuser(input: $input, condition: $condition) {
      id
      username
      password
      email
      createdAt
      updatedAt
    }
  }
`;
