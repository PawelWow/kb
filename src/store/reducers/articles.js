import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    collection: []
}

const addArticleSuccess = (state, action) => {
    return updateObject( state, {
        collection: [...state.collection, action.article]
    });
}

const reducer = ( state = initialState, action) => {
    switch( action.type ) {
        case actionTypes.ARTICLES_ADD_SUCCESS: return addArticleSuccess(state, action);
        default:
            return state;
    }
};

export default reducer;