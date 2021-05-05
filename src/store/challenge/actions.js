export const ACTIONS_TYPES = {
  createChallenge: "@CHALLENGE/CREATE-CHALLENGE",
  createChallengeSuccess: "@CHALLENGE/CREATE-CHALLENGE-SUCCESS",
  getChallenge: "@CHALLENGE/GET-CHALLENGE",
  createChallengeFailed : "@CHALLENGE/CREATE-CHALLENGE-FAILED"
};

export const createChallenge = (payload) => ({
  type: ACTIONS_TYPES.createChallenge,
  payload,
});

export const createChallengeFailed = (payload) => ({
  type: ACTIONS_TYPES.createChallengeFailed,
  payload,
});

export const createChallengeSuccess = (payload) => ({
  type: ACTIONS_TYPES.createChallengeSuccess,
  payload,
})

