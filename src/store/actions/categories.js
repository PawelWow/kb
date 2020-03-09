import * as actionTypes from './actionTypes';

export const initCategories = () => {
    return {
        type: actionTypes.CATEGORIES_INIT
    }
}

export const setCategories = (categories) => {
    return {
        type: actionTypes.CATEGORIES_SET,
        categories: categories
    }
}

export const addCategory = (category, token) => {
    return {
        type: actionTypes.CATEGORIES_ADD,
        category: category,
        token: token
    };
};

export const addCategorySuccess = (category) => {
    return {
        type: actionTypes.CATEGORIES_ADD_SUCCESS,
        category: category
    }
}

export const editCategory = (id, category, token) => {
    return {
        type: actionTypes.CATEGORIES_EDIT,
        id: id,
        category: category,
        token: token
    };
};

export const setChangesCount = () => {
    return {
        type: actionTypes.CATEGORIES_CHANGES_COUNT        
    }
}