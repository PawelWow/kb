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

export const deleteCategory = (id, token) => {
    return {
        type: actionTypes.CATEGORIES_DELETE,
        id: id,
        token: token
    };
};

export const deleteCategorySuccess = (id) => {
    return {
        type: actionTypes.CATEGORIES_DELETE_SUCCESS,
        id: id
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

export const editCategorySuccess = (id, category) => {
    return {
        type: actionTypes.CATEGORIES_EDIT_SUCCESS,
        id: id,
        category: category
    };
};

