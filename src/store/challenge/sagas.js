import { takeLatest, put, call, select } from "@redux-saga/core/effects";
import * as actions from "./actions";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { startLoading, finishLoading } from "../loader/actions";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import { v4 as uuidv4 } from "uuid";

const createChallengeAPI = async (challenge) =>
  await API.graphql(
    graphqlOperation(mutations.createChallenge, { input: challenge })
  );

const getChallengeAPI = async (id) =>
  await API.graphql(graphqlOperation(queries.getChallenge, { id }));

const updateChallenge = async (input) =>
  await API.graphql(
    graphqlOperation(mutations.updateChallenge, {
      input,
    })
  );

const uploadVideoAPI = async ({ recordedChunks, challenge, challenger }) => {
  const uuid = uuidv4();
  await Storage.put(`${uuid}.mp4`, recordedChunks, {
    contentType: "video/mp4",
  });
  await API.graphql(
    graphqlOperation(mutations.createVideoObject, { input: { id: uuid } })
  );
  const vodAsset = await API.graphql(
    graphqlOperation(mutations.createVodAsset, {
      input: {
        title: `${challenge.id}-video-proof`,
        description: challenge.description,
        videoID: uuid,
      },
    })
  );
  const {
    data: { updateChallenge: res },
  } = await updateChallenge({
      id: challenge.id,
      vodID: vodAsset.data.createVodAsset.id,
      challenger,
  });

  return res;
};

function* createChallengeSaga({ payload }) {
  try {
    yield put(startLoading());
    const {
      data: { createChallenge },
    } = yield call(createChallengeAPI, payload);
    localStorage.setItem(
      "state",
      JSON.stringify({
        Challenge: { data: createChallenge, err: {}, submitted: false },
      })
    );
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
    localStorage.setItem(
      "state",
      JSON.stringify({ Challenge: { data: getChallenge, err: {} } })
    );
    yield put(actions.getChallengeSuccess(getChallenge));
  } catch (err) {
    yield put(
      actions.getChallengeFailed({
        data: {},
        err: "no pudimos encontrar el reto, intenta nuevamente",
        errorPage: true,
      })
    );
  } finally {
    yield put(finishLoading());
  }
}

function* voteChallenge({ payload }) {
  const challenge = yield select(({ Challenge }) => Challenge.data);
  try {
    yield put(startLoading());
    let accomplish = challenge.accomplish;
    let notAccomplished = challenge.notAccomplished;
    payload ? accomplish++ : notAccomplished++;
    const {
      data: { updateChallenge: challengeObject },
    } = yield call(updateChallenge, {
      id: challenge.id,
      accomplish,
      notAccomplished,
    });
    yield put(actions.voteChallengeSuccess(challengeObject));
  } catch (err) {
    yield put(
      actions.voteChallengeFailed({
        data: challenge,
        err: "Algo fallo al votar, intenta nuevamente, refresca la pagina",
        errorPage: true,
      })
    );
  } finally {
    yield put(finishLoading());
  }
}

function* submitChallenge({ payload }) {
  const challenge = yield select(({ Challenge }) => Challenge.data);
  try {
    yield put(startLoading());
    const challengeObject = yield call(uploadVideoAPI, {
      challenger: payload.challenger,
      recordedChunks: payload.recordedChunks,
      challenge,
    });
    localStorage.setItem(
      "state",
      JSON.stringify({
        Challenge: { data: challengeObject, err: {}, submitted: true },
      })
    );
    yield put(actions.submitChallengeSuccess(challengeObject));
  } catch (err) {
    console.error(err);
    yield put(
      actions.submitChallengeFailed({
        data: challenge,
        err: "no pudimos completar la Operación ",
        submitted: false,
      })
    );
  } finally {
    yield put(finishLoading());
  }

  // Storage
}
export function* challengeSaga() {
  yield takeLatest(actions.ACTIONS_TYPES.submitChallenge, submitChallenge);
  yield takeLatest(actions.ACTIONS_TYPES.createChallenge, createChallengeSaga);
  yield takeLatest(actions.ACTIONS_TYPES.getChallenge, getChallenge);
  yield takeLatest(actions.ACTIONS_TYPES.voteChallenge, voteChallenge);
}
