import * as actionTypes from './actionTypes';

export const initArticles = () => {
    return {
        type: actionTypes.ARTICLES_INIT
    }
}

export const setArticles = (details) => {
    return {
        type: actionTypes.ARTICLES_SET,
        details: details
    }
}

export const getContent = (contentId) => {
    return {
        type: actionTypes.ARTICLES_GET_CONTENT,
        contentId: contentId
    }
}

export const setContent = (content) => {
    return {
        type: actionTypes.ARTICLES_SET_CONTENT,
        content: content
    }
}

export const addArticle = (details, content, token) => {
    return {
        type: actionTypes.ARTICLES_ADD,
        details: details,
        content: content,
        token: token
    };
};

export const addArticleSuccess = (details) => {
    return {
        type: actionTypes.ARTICLES_ADD_SUCCESS,
        details: details
    }
}