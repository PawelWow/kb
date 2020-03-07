import * as actionTypes from './actionTypes';

export const addCategory = (category, token) => {
    return {
        type: actionTypes.CATEGORIES_ADD,
        category: category,
        token: token
    };
};
