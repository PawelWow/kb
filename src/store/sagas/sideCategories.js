import { put } from 'redux-saga/effects';
import axios from '../../axios-db';

import * as actions from "../actions/index";

export function* initCategoriesSaga(action){
    try {
        const response = yield axios.get('/categories.json');

        const fetchCategories = [];
        for(let key in response.data)
        {
            fetchCategories.push( {...response.data[key], id: key});
        }
        yield put(actions.setCategories(fetchCategories));

    } catch( error ) {
        // TODO error handling
        console.log(error);
    }
}