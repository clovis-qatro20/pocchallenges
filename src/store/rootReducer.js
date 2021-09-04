import { combineReducers } from "redux";
import Challenge from "./challenge/reducer";
import Loader from "./loader/reducer"
import Challenges from "./challenges/reducer"

const rootReducer = combineReducers({ Challenge, Loader, Challenges });

export default rootReducer;
