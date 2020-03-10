import { put } from 'redux-saga/effects';
import axios from '../../axios-db';

import * as actions from "../actions/index";

export function* initArticlesSaga(action){
    try {
        const response = yield axios.get('/articles.json?fields=title,description,category');
        
        const fetchArticles = [];
        for(let key in response.data)
        {
            fetchArticles.push( {...response.data[key], id: key});
        }
        yield put(actions.setArticles(fetchArticles));

    } catch( error ) {
        // TODO error handling
        handleError(error);
    }
}

export function* addArticleSaga(action) {
    try {
        console.log("saga");
        const response = yield axios.post(getArticlesAuthUrl(action.token), action.article);

        // w firebase dostaniemy id w formie name: "ID". Name tutaj oznacza child element name, a nie naszego propsa
        const addedArticle = {...action.article, id: response.data.name};
        yield put(actions.addArticleSuccess(addedArticle));        
    } catch( error ) {
        handleError(error);
    }
}

const getArticlesAuthUrl = token => {
    return `/articles.json?auth=${token}` ;
}

const getArticleAuthUrl = (id, token) => {
    return `/articles/${id}.json?auth=${token}`;
}

const handleError = error => {
    console.log("error:");
    console.log(error);   
}