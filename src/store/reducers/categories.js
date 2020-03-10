import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    collection: null
}

const addCategorySuccess = (state, action) => {
    return updateObject( state, {
        collection: [...state.collection, action.category]
    });
}

const editCategorySuccess = (state, action ) => {
    console.log("id");
    console.log(action.id);
    let updatedCategories = [];
    state.collection.map( category => {
        if(category.id === action.id){
            updatedCategories.push({...action.category, id: category.id});

        } else {
            updatedCategories.push(category);
        }        
    });

    return updateObject( state, {
        collection: updatedCategories
    });
}

const deleteCategorySuccess = (state, action) => {
    return updateObject( state, {
        collection: state.collection.filter(category => category.id !== action.id)
    });
}

const setCategories = (state, action ) => {
    return updateObject( state, {
        collection: action.categories.sort()
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CATEGORIES_ADD_SUCCESS: return addCategorySuccess(state, action);
        case actionTypes.CATEGORIES_DELETE_SUCCESS: return deleteCategorySuccess(state, action);
        case actionTypes.CATEGORIES_EDIT_SUCCESS: return editCategorySuccess(state, action);
        case actionTypes.CATEGORIES_SET: return setCategories(state, action);
        default: return state;
    }
};

export default reducer;