import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    details: [],
    currentContent: ''
}

const setArticles = (state, action ) => {
    return updateObject( state, {
        details: action.details
    });
};

const addArticleSuccess = (state, action) => {
    return updateObject( state, {
        details: [...state.details, action.details]
    });
}

const setContent = (state, action) => {
    return updateObject( state, {
        currentContent: action.content
    })
}

const reducer = ( state = initialState, action) => {
    switch( action.type ) {
        case actionTypes.ARTICLES_ADD_SUCCESS: return addArticleSuccess(state, action);
        case actionTypes.ARTICLES_SET: return setArticles(state, action);
        case actionTypes.ARTICLES_SET_CONTENT: return setContent(state, action);
        default:
            return state;
    }
};

export default reducer;