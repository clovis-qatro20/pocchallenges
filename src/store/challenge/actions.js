export const ACTIONS_TYPES = {
  createChallenge: "@CHALLENGE/CREATE-CHALLENGE",
  createChallengeSuccess: "@CHALLENGE/CREATE-CHALLENGE-SUCCESS",
  createChallengeFailed: "@CHALLENGE/CREATE-CHALLENGE-FAILED",
  getChallenge: "@CHALLENGE/GET-CHALLENGE",
  getChallengeSuccess: "@CHALLENGE/GET-CHALLENGE-SUCCESS",
  getChallengeFailed: "@CHALLENGE/GET-CHALLENGE-FAILED",
  submitChallenge: "@CHALLENGE/SUBMIT-CHALLENGE"
};

export const createChallenge = (payload) => ({
  type: ACTIONS_TYPES.createChallenge,
  payload,
});

export const createChallengeSuccess = (payload) => ({
  type: ACTIONS_TYPES.createChallengeSuccess,
  payload,
});

export const createChallengeFailed = (payload) => ({
  type: ACTIONS_TYPES.createChallengeFailed,
  payload,
});

export const getChallenge = (payload) => ({
  type: ACTIONS_TYPES.getChallenge,
  payload,
});

export const getChallengeSuccess = (payload) => ({
  type: ACTIONS_TYPES.getChallengeSuccess,
  payload,
});

export const getChallengeFailed = (payload) => ({
  type: ACTIONS_TYPES.getChallengeFailed,
  payload,
});

export const submitChallenge = (payload) => ({
  type: ACTIONS_TYPES.submitChallenge,
  payload,
});

