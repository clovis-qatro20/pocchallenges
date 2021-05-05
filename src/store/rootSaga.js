import { all, fork } from 'redux-saga/effects'
import { challengeSaga } from './challenge/sagas'

export default function* rootSaga() {
  yield all([fork(challengeSaga)])
}