import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    categories: null,
    changesCount: 0
}

const setCategories = (state, action ) => {
    return updateObject( state, {
        categories: action.categories,
        changesCount: 0        
    });
};

const setChangesCount = (state, action) => {
    return updateObject( state, {
        changesCount: state.changesCount + 1
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CATEGORIES_SET: return setCategories(state, action);
        case actionTypes.CATEGORIES_CHANGES_COUNT: return setChangesCount(state, action);
        default: return state;
    }
};

export default reducer;