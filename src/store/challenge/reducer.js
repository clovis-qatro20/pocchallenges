import { ACTIONS_TYPES } from "./actions";

export default function (state = {}, action) {
  switch (action.type) {
    case ACTIONS_TYPES.updateVoting:
    case ACTIONS_TYPES.rejectChallengeSuccess:
    case ACTIONS_TYPES.voteChallengeSuccess: {
      return { data: action.payload, err: null, submitted: true };
    }
    case ACTIONS_TYPES.submitChallengeSuccess: {
      return { data: action.payload, err: null, submitted: true };
    }
    case ACTIONS_TYPES.getChallengeSuccess:
    case ACTIONS_TYPES.createChallengeSuccess: {
      return {
        data: action.payload,
        err: null,
        submitted: false,
      };
    }
    case ACTIONS_TYPES.voteChallengeFailed:
    case ACTIONS_TYPES.getChallengeFailed:
    case ACTIONS_TYPES.createChallengeFailed: {
      return action.payload;
    }
    case ACTIONS_TYPES.getChallenget:
    case ACTIONS_TYPES.resetChallenge:
    case ACTIONS_TYPES.createChallenge: {
      return {};
    }
    default:
      return { ...state };
  }
}
