import * as actionTypes from './actionTypes';

export const initCategories = () => {
    return {
        type: actionTypes.INIT_CATEGORIES
    }
}

export const setCategories = (categories) => {
    return {
        type: actionTypes.SET_CATEGORIES,
        categories: categories
    }
}