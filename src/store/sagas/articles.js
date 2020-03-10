import { put } from 'redux-saga/effects';
import axios from '../../axios-db';

import * as actions from "../actions/index";

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