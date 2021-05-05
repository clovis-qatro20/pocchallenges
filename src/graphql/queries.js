/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getChallenge = /* GraphQL */ `
  query GetChallenge($id: ID!) {
    getChallenge(id: $id) {
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
export const listChallenges = /* GraphQL */ `
  query ListChallenges(
    $filter: ModelChallengeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChallenges(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
