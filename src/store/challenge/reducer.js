import { ACTIONS_TYPES } from "./actions";

export default function (state = {}, action) {
  switch (action.type) {
    case ACTIONS_TYPES.getChallengeSuccess:
    case ACTIONS_TYPES.createChallengeSuccess: {
      return { data: action.payload, err: null };
    }
    case ACTIONS_TYPES.getChallengeFailed:
    case ACTIONS_TYPES.createChallengeFailed: {
      return action.payload;
    }
    case ACTIONS_TYPES.getChallenget:
    case ACTIONS_TYPES.createChallenge: {
      return {};
    }
    default:
      return { ...state };
  }
}
