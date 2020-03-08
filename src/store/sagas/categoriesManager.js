import axios from '../../axios-db';

export function* addCategorySaga(action) {

    try {
        const response = yield axios.post(getCategoriesAuthUrl(action.token), action.category);
        console.log("added:" + action.category.name);

    } catch( error ) {
        handleError(error);
    }
}

export function* editCategorySaga(action) {
    try {
        const response = yield axios.patch(getCategoryAuthUrl(action.id, action.token), action.category);
        console.log("Edited: " + action.category.name);
    } catch (error) {
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