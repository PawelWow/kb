import { put, effectTypes } from 'redux-saga/effects';
import axios from '../../axios-db';

import * as actions from "../actions/index";

/***
 * Struktura bazy - fragment:
 * articles
 *    - details (drobne dane)
 *    - content (cięższe dane - cały tekst)
 * 
 */

export function* initArticlesSaga(action){
    try {
        console.log("init");
        const response = yield axios.get('/articles/details.json');
        
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
        const responseContent = yield axios.post(getArticlesContentsAuthUrl(action.token), {content: action.content});
        
        // w firebase dostaniemy id w formie name: "ID". Name tutaj oznacza child element name, a nie naszego propsa
        const articleDetails = { ...action.details, contentId: responseContent.data.name };
        const responseDetails = yield axios.post(getArticlesDetailsAuthUrl(action.token), articleDetails);        
        
        yield put(actions.addArticleSuccess({...articleDetails, id: responseDetails.data.name}));        
    } catch( error ) {
        handleError(error);
    }
}

const getArticlesDetailsAuthUrl = token => {
    return `/articles/details.json?auth=${token}` ;
}

const getArticlesContentsAuthUrl = token => {
    return `/articles/content.json?auth=${token}` ;
}



const handleError = error => {
    console.log("error:");
    console.log(error);   
}