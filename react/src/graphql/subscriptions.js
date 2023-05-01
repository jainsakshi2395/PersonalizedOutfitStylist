/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onCreateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onUpdateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
    onDeleteTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onCreateNewuser = /* GraphQL */ `
  subscription OnCreateNewuser($filter: ModelSubscriptionNewuserFilterInput) {
    onCreateNewuser(filter: $filter) {
      id
      username
      password
      email
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNewuser = /* GraphQL */ `
  subscription OnUpdateNewuser($filter: ModelSubscriptionNewuserFilterInput) {
    onUpdateNewuser(filter: $filter) {
      id
      username
      password
      email
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNewuser = /* GraphQL */ `
  subscription OnDeleteNewuser($filter: ModelSubscriptionNewuserFilterInput) {
    onDeleteNewuser(filter: $filter) {
      id
      username
      password
      email
      createdAt
      updatedAt
    }
  }
`;
