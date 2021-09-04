import { all, fork } from "redux-saga/effects";
import { challengeSaga } from "./challenge/sagas";
import challengesSaga from "./challenges/sagas";

export default function* rootSaga() {
  yield all([fork(challengeSaga), fork(challengesSaga)]);
}
