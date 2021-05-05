import { takeLatest, put, call } from "@redux-saga/core/effects";
import * as actions from "./actions";
import { API, graphqlOperation } from "aws-amplify";
import { startLoading, finishLoading } from "../loader/actions";
import * as mutations from "../../graphql/mutations";

const createChallengeAPI = async (challenge) =>
  await API.graphql(
    graphqlOperation(mutations.createChallenge, { input: challenge })
  );

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
        err:
          "no pudimos crear el reto, revisa que todos los datos esten correctos",
      })
    );
  } finally {
    yield put(finishLoading());
  }
}

export function* challengeSaga() {
  yield takeLatest(actions.ACTIONS_TYPES.createChallenge, createChallengeSaga);
}
