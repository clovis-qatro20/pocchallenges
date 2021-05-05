import { ACTIONS_TYPES } from "./actions";

export default function (state = false, action) {
  switch (action.type) {
    case ACTIONS_TYPES.start:
      return true;
    case ACTIONS_TYPES.finish:
      return false;
    default:
      return state;
  }
}
