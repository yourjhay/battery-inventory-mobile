import { initialState } from './initialState';
import * as t from './actionTypes';

export const termsReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.TERMS_STATE:
        return {
            ...state,
            ...action.payload, // this is what we expect to get back from API call and login page input
            isTermsAccept: action.isTermsAccept, // we set this as true on login
        };
        default:
        return state;
    }
};