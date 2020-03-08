import { takeEvery, all } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";

import {
    logoutSaga,
    checkAuthTimeoutSaga,
    authUserSaga,
    authCheckStateSaga
} from "./auth";

import {
    initCategoriesSaga    
} from "./sideCategories";

import {
    addCategorySaga,
    editCategorySaga
} from "./categoriesManager";
import { editCategory } from "../actions";

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITITATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)        
    ]);
}

export function* watchCategories() {
    yield takeEvery(actionTypes.CATEGORIES_INIT, initCategoriesSaga);
}

export function* watchCategoriesManager() {
    yield all ([
        takeEvery(actionTypes.CATEGORIES_ADD, addCategorySaga),
        takeEvery(actionTypes.CATEGORIES_EDIT, editCategorySaga)
    ]);
}

