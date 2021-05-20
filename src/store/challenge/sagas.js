import { takeLatest, put, call } from "@redux-saga/core/effects";
import * as actions from "./actions";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { startLoading, finishLoading } from "../loader/actions";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";

const createChallengeAPI = async (challenge) =>
  await API.graphql(
    graphqlOperation(mutations.createChallenge, { input: challenge })
  );

const getChallengeAPI = async (id) =>
  await API.graphql(graphqlOperation(queries.getChallenge, { id }));

function* createChallengeSaga({ payload }) {
  try {
    yield put(startLoading());
    const {
      data: { createChallenge },
    } = yield call(createChallengeAPI, payload);
    yield put(actions.createChallengeSuccess(createChallenge));
  } catch (err) {
    yield put(
      actions.createChallengeFailed({
        data: {},
        err: "no pudimos crear el reto, revisa que todos los datos esten correctos",
      })
    );
  } finally {
    yield put(finishLoading());
  }
}

function* getChallenge({ payload }) {
  try {
    yield put(startLoading());
    const {
      data: { getChallenge },
    } = yield call(getChallengeAPI, payload);
    yield put(actions.getChallengeSuccess(getChallenge));
  } catch (err) {
    yield put(
      actions.getChallengeFailed({
        data: {},
        err: "no pudimos crear el reto, revisa que todos los datos esten correctos",
        errorPage: true,
      })
    );
  } finally {
    yield put(finishLoading());
  }
}

function* submitChallenge({ payload }) {
  try {
    yield put(startLoading());
    const res = Storage.put("my first video", payload, {
      contentType: "video/webm",
    });
    console.log(res);
  } catch (err) {
    console.error(err);
  }

  // Storage
}
export function* challengeSaga() {
  yield takeLatest(actions.ACTIONS_TYPES.submitChallenge, submitChallenge);
  yield takeLatest(actions.ACTIONS_TYPES.createChallenge, createChallengeSaga);
  yield takeLatest(actions.ACTIONS_TYPES.getChallenge, getChallenge);
}
