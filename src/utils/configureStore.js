import logger from 'redux-logger'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../redux';

// const createStoreWithMiddleware = applyMiddleware(
//   thunkMiddleware,
//   logger
// )(createStore)

export default function configureStore(preloadedState) {
  const middlewares = [logger, thunk]

  const store = createStore(rootReducer, preloadedState, applyMiddleware(...middlewares))

  return store
}

// export default function configureStore(initialState) {
//   return createStoreWithMiddleware(rootReducer, initialState)
// }