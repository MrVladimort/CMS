import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route} from "react-router-dom";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from './redux/rootReducer';

import setAuthorizationHeader from "./utils/setAuthorizationHeader";
import authActions from "./redux/actions/auth";

const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk))
);

async function init() {
    try {
        const token = localStorage.getItem('CMS_pro');
        if (token) {
            setAuthorizationHeader(token);
            console.log(token);
            await authActions.loginAccessToken(token, store.dispatch);
        }
    } catch (err) {
        console.log(err);
        localStorage.removeItem("CMS_pro");
        setAuthorizationHeader();
    }

    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <Route component={App}/>
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );
    serviceWorker.unregister();
}

init().catch(console.error);
