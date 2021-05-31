import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "./rootReducer";
import saga from "./rootSaga";

const persistedState = localStorage.getItem("state")
  ? JSON.parse(localStorage.getItem("state"))
  : {};

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// Mount it on the Store
const store = createStore(
  reducer,
  persistedState,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// Then run the saga
sagaMiddleware.run(saga);

export default store;
