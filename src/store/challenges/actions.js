export const ACTIONS_TYPES = {
  listChallenges: "@CHALLENGE/LIST-CHALLENGE",
  listChallengesSuccess: "@CHALLENGE/LIST-CHALLENGE-SUCCESS",
};

export const listChallenges = () => ({
  type: ACTIONS_TYPES.listChallenges,
});

export const listChallengesSuccess = (payload) => ({
  type: ACTIONS_TYPES.listChallengesSuccess,
  payload,
});
