import * as actionTypes from '../actions/actionTypes';

const initCategory = (state, action ) => {
    return updateObject( state, {
        category: action.category
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CATEGORIES_EDIT_INIT: return initCategory(state, action);
        default: return state;
    }
};

export default reducer;