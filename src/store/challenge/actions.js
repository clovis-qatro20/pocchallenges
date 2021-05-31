export const ACTIONS_TYPES = {
  createChallenge: "@CHALLENGE/CREATE-CHALLENGE",
  createChallengeSuccess: "@CHALLENGE/CREATE-CHALLENGE-SUCCESS",
  createChallengeFailed: "@CHALLENGE/CREATE-CHALLENGE-FAILED",
  getChallenge: "@CHALLENGE/GET-CHALLENGE",
  getChallengeSuccess: "@CHALLENGE/GET-CHALLENGE-SUCCESS",
  getChallengeFailed: "@CHALLENGE/GET-CHALLENGE-FAILED",
  submitChallenge: "@CHALLENGE/SUBMIT-CHALLENGE",
  submitChallengeSuccess: "@CHALLENGE/SUBMIT-CHALLENGE-SUCCESS",
  submitChallengeFailed: "@CHALLENGE/SUBMIT-CHALLENGE-SUCCESS-FAILED",
  resetChallenge: "@CHALLENGE/RESET-CHALLENGE",
  voteChallenge: "@CHALLENGE/VOTE-CHALLENGE",
  voteChallengeSuccess: "@CHALLENGE/SUCCESS-CHALLENGE",
  voteChallengeFailed: "@CHALLENGE/SUCCESS-FAILED",
  updateVoting: "@CHALLENGE/UPDATE-VOTING",
};

export const createChallenge = (payload) => ({
  type: ACTIONS_TYPES.createChallenge,
  payload,
});

export const updateVoting = (payload) => ({
  type: ACTIONS_TYPES.updateVoting,
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
export const submitChallengeSuccess = (payload) => ({
  type: ACTIONS_TYPES.submitChallengeSuccess,
  payload,
});

export const submitChallengeFailed = (payload) => ({
  type: ACTIONS_TYPES.submitChallengeFailed,
  payload,
});

export const resetChallenge = () => ({
  type: ACTIONS_TYPES.resetChallenge,
});

export const voteChallenge = (payload) => ({
  type: ACTIONS_TYPES.voteChallenge,
  payload
})

export const voteChallengeSuccess = (payload) => ({
  type: ACTIONS_TYPES.voteChallengeSuccess,
  payload
})

export const voteChallengeFailed = (payload) => ({
  type: ACTIONS_TYPES.voteChallengeFailed,
  payload
})
