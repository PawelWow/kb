import * as actionTypes from './actionTypes';

export const initArticles = () => {
    return {
        type: actionTypes.ARTICLES_INIT
    }
}

export const setArticles = (articles) => {
    return {
        type: actionTypes.ARTICLES_SET,
        articles: articles
    }
}

export const addArticle = (article, token) => {
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