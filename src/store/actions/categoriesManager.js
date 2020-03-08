import * as actionTypes from './actionTypes';

export const initCategory = () => {
    return {
        type: actionTypes.CATEGORIES_EDIT_INIT
    }
}

export const addCategory = (category, token) => {
    return {
        type: actionTypes.CATEGORIES_ADD,
        category: category,
        token: token
    };
};

export const editCategory = (id, category, token) => {
    return {
        type: actionTypes.CATEGORIES_EDIT,
        id: id,
        category: category,
        token: token
    };
};
