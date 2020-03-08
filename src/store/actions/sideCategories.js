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

export const setChangesCount = () => {
    return {
        type: actionTypes.CATEGORIES_CHANGES_COUNT        
    }
}