import * as actionTypes from './actionTypes';

export const addArticle = (article, token) => {
    console.log("action");
    return {
        type: actionTypes.ARTICLES_ADD,
        article: article,
        token: token
    };
};

export const addArticleSuccess = (article) => {
    return {
        type: actionTypes.ARTICLES_ADD_SUCCESS,
        article: article
    }
}