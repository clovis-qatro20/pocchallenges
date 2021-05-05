/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createChallenge = /* GraphQL */ `
  mutation CreateChallenge(
    $input: CreateChallengeInput!
    $condition: ModelChallengeConditionInput
  ) {
    createChallenge(input: $input, condition: $condition) {
      id
      owner {
        email
        name
      }
      description
      expires
      price
      challenger {
        email
        name
      }
      code
      accomplish
      notAccomplished
      createdAt
      updatedAt
    }
  }
`;
export const updateChallenge = /* GraphQL */ `
  mutation UpdateChallenge(
    $input: UpdateChallengeInput!
    $condition: ModelChallengeConditionInput
  ) {
    updateChallenge(input: $input, condition: $condition) {
      id
      owner {
        email
        name
      }
      description
      expires
      price
      challenger {
        email
        name
      }
      code
      accomplish
      notAccomplished
      createdAt
      updatedAt
    }
  }
`;
export const deleteChallenge = /* GraphQL */ `
  mutation DeleteChallenge(
    $input: DeleteChallengeInput!
    $condition: ModelChallengeConditionInput
  ) {
    deleteChallenge(input: $input, condition: $condition) {
      id
      owner {
        email
        name
      }
      description
      expires
      price
      challenger {
        email
        name
      }
      code
      accomplish
      notAccomplished
      createdAt
      updatedAt
    }
  }
`;
