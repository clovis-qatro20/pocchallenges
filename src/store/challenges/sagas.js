import { takeLatest, put, call } from "@redux-saga/core/effects";
import * as actions from "./actions";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { startLoading, finishLoading } from "../loader/actions";
import * as queries from "../../graphql/queries";
import moment from "moment";

const getChallengesAPI = async () =>
  await API.graphql(
    graphqlOperation(queries.listChallenges, {
      limit: 20,
    })
  );

function* listChallenges() {
  try {
    yield put(startLoading());
    const {
      data: {
        listChallenges: { items },
      },
    } = yield call(getChallengesAPI);
    yield put(
      actions.listChallengesSuccess(
        items.sort(
          (challenge, lastChallenge) =>
            new Date(challenge.expires).getTime() -
            new Date(lastChallenge.expires).getTime()
        )
      )
    );
  } catch (err) {
    console.error(err);
  } finally {
    yield put(finishLoading());
  }
}

export default function* challengesSaga() {
  yield takeLatest(actions.ACTIONS_TYPES.listChallenges, listChallenges);
}
