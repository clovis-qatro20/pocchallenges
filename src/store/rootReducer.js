import { combineReducers } from "redux";
import Challenge from "./challenge/reducer";
import Loader from "./loader/reducer"

const rootReducer = combineReducers({ Challenge, Loader });

export default rootReducer;
