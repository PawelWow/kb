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
        handleError(error);
    }
}

export function* addCategorySaga(action) {

    try {
        const response = yield axios.post(getCategoriesAuthUrl(action.token), action.category);

        // w firebase dostaniemy id w formie name: "ID". Name tutaj oznacza child element name, a nie naszego propsa
        const addedCategory = {...action.category, id: response.data.name};
        yield put(actions.addCategorySuccess(addedCategory));        
    } catch( error ) {
        handleError(error);
    }
}

export function* editCategorySaga(action) {
    try {
        yield axios.patch(getCategoryAuthUrl(action.id, action.token), action.category);

        yield put(actions.editCategorySuccess(action.id, action.category))
    } catch (error) {
        handleError(error);
    }
}

export function* deleteCategorySaga(action) {
    try {
        yield axios.delete(getCategoryAuthUrl(action.id, action.token));
        yield put(actions.deleteCategorySuccess(action.id));
    } catch(error) {
        handleError(error);
    }
}

const getCategoriesAuthUrl = token => {
    return `/categories.json?auth=${token}` ;
}

const getCategoryAuthUrl = (id, token) => {
    return `/categories/${id}.json?auth=${token}`;
}

const handleError = error => {
    console.log("error:");
    console.log(error);   
}
