import * as t from './actionTypes';

// this is what our action should look like which dispatches the "payload" to reducer
// const setTermsState = (data) => {
//     return {
//         type: t.TERMS_STATE,
//         payload: data,
//     };
// };

export const setTermsState = (terms) => {

    return (dispatch) => {  // don't forget to use dispatch here!
    
        dispatch({ 
            type: t.TERMS_STATE,
            isTermsAccept: terms 
        }); // our action is called here
    };
};