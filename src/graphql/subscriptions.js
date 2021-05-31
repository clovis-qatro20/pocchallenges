/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdateChallengeSubscription = /* GraphQL */ `
  subscription OnUpdateChallengeSubscription($id: ID!) {
    onUpdateChallengeSubscription(id: $id) {
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
      vodID
      vodAsset {
        id
        title
        description
        videoID
        video {
          id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateChallenge = /* GraphQL */ `
  subscription OnCreateChallenge {
    onCreateChallenge {
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
      vodID
      vodAsset {
        id
        title
        description
        videoID
        video {
          id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateChallenge = /* GraphQL */ `
  subscription OnUpdateChallenge {
    onUpdateChallenge {
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
      vodID
      vodAsset {
        id
        title
        description
        videoID
        video {
          id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteChallenge = /* GraphQL */ `
  subscription OnDeleteChallenge {
    onDeleteChallenge {
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
      vodID
      vodAsset {
        id
        title
        description
        videoID
        video {
          id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateVodAsset = /* GraphQL */ `
  subscription OnCreateVodAsset {
    onCreateVodAsset {
      id
      title
      description
      videoID
      video {
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateVodAsset = /* GraphQL */ `
  subscription OnUpdateVodAsset {
    onUpdateVodAsset {
      id
      title
      description
      videoID
      video {
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteVodAsset = /* GraphQL */ `
  subscription OnDeleteVodAsset {
    onDeleteVodAsset {
      id
      title
      description
      videoID
      video {
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateVideoObject = /* GraphQL */ `
  subscription OnCreateVideoObject {
    onCreateVideoObject {
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateVideoObject = /* GraphQL */ `
  subscription OnUpdateVideoObject {
    onUpdateVideoObject {
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteVideoObject = /* GraphQL */ `
  subscription OnDeleteVideoObject {
    onDeleteVideoObject {
      id
      createdAt
      updatedAt
    }
  }
`;
