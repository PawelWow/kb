import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    collection: null,
    changesCount: 0
}

const addCategorySuccess = (state, action) => {
    return updateObject( state, {
        collection: [...state.collection, action.category]
    });
}

const setCategories = (state, action ) => {
    return updateObject( state, {
        collection: action.categories,
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
        case actionTypes.CATEGORIES_ADD_SUCCESS: return addCategorySuccess(state, action);
        case actionTypes.CATEGORIES_SET: return setCategories(state, action);
        case actionTypes.CATEGORIES_CHANGES_COUNT: return setChangesCount(state, action);
        default: return state;
    }
};

export default reducer;