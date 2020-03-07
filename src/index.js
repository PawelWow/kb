import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import authReducer from './store/reducers/auth';
import sideCategoriesReducer from './store/reducers/sideCategories';
import { watchAuth, watchCategories, watchCategoriesManager } from './store/sagas';

import createSagaMiddleware from 'redux-saga';

const rootReducer = combineReducers({
    auth: authReducer,
    sideCategories: sideCategoriesReducer
});

const sagaMiddleware = createSagaMiddleware();

// TODO moze byc zle
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchCategories);
sagaMiddleware.run(watchCategoriesManager)

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);


ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
