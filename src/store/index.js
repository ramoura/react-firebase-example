import {applyMiddleware, createStore} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
import thunk from "redux-thunk";

import history from "../routes/history";
import createRootReducer from '../reducer'


const middlewares = [routerMiddleware(history), thunk];

const store = createStore(
    createRootReducer(history),
    applyMiddleware(...middlewares),
);

export default store;