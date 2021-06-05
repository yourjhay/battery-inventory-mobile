import { termsReducer } from './reducer';

import { combineReducers } from 'redux'

/**
 * ## CombineReducers
 * the rootReducer will call each and every reducer with the state and action
 * EVERY TIME there is a basic action
 */
const rootReducer = combineReducers({
    termsReducer: termsReducer
})

export default rootReducer