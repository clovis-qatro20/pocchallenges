import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "./rootReducer";
import saga from "./rootSaga";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// eslint-disable-next-line no-underscore-dangle
let devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && 
window.__REDUX_DEVTOOLS_EXTENSION__();
if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
    devTools = a => a;
}

// Mount it on the Store
const store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleware),
    // devTools
  )
);

// Then run the saga
sagaMiddleware.run(saga);

export default store;
