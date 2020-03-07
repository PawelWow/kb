import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    categories: null
}

const setCategories = (state, action ) => {
    return updateObject( state, {
        categories: action.categories
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CATEGORIES_SET: return setCategories(state, action);
        default: return state;
    }
};

export default reducer;