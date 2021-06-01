import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "./rootReducer";
import saga from "./rootSaga";

const persistedState = localStorage.getItem("state")
  ? JSON.parse(localStorage.getItem("state"))
  : {};

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null

// Mount it on the Store
const store = createStore(
  reducer,
  persistedState,
  compose(
    applyMiddleware(sagaMiddleware),
    devTools
  )
);

// Then run the saga
sagaMiddleware.run(saga);

export default store;
