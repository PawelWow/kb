import { put } from 'redux-saga/effects';
import axios from '../../axios-db';


export function* addCategorySaga(action) {

    try {
        const response = yield axios.post(getAuthUrl(action.token), action.category);
        console.log("added:" + action.category.name);

    } catch( error ) {
        console.log("error:");
        console.log(error);
    }
}

const getAuthUrl = token => {
    return `/categories.json?auth=${token}` ;
}