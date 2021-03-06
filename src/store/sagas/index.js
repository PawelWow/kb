import { takeEvery, all } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";

import {
    logoutSaga,
    checkAuthTimeoutSaga,
    authUserSaga,
    authCheckStateSaga
} from "./auth";

import {
    initCategoriesSaga,
    addCategorySaga,
    deleteCategorySaga,
    editCategorySaga
} from "./categories";

import {
    initArticlesSaga,
    getContentSaga,
    addArticleSaga
} from "./articles";

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITITATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)        
    ]);
}

export function* watchCategories() {
    yield all ([
        takeEvery(actionTypes.CATEGORIES_INIT, initCategoriesSaga),
        takeEvery(actionTypes.CATEGORIES_ADD, addCategorySaga),
        takeEvery(actionTypes.CATEGORIES_DELETE, deleteCategorySaga),
        takeEvery(actionTypes.CATEGORIES_EDIT, editCategorySaga)
    ]);
}

export function* watchArticles(){
    yield all ([
        takeEvery(actionTypes.ARTICLES_INIT, initArticlesSaga),
        takeEvery(actionTypes.ARTICLES_GET_CONTENT, getContentSaga),
        takeEvery(actionTypes.ARTICLES_ADD, addArticleSaga) 
    ]);
}
