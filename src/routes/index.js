import React from "react";

import firebaseService from '../service/FirebaseService'

import {Switch, Route, Redirect} from "react-router-dom";
import {ConnectedRouter} from "connected-react-router";

import Main from "../pages/Main";
import Login from "../pages/Login";
import TaskList from "../pages/TaskList";

import history from "./history";

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props =>
        firebaseService.isLogged() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/', state: {from: props.location}}}/>
        )
    }/>
)

const Routes = () => (
    <ConnectedRouter history={history}>
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/login" component={Login}/>
            <Route path="/about" component={() => <h1> About </h1>}/>
            <PrivateRoute path="/list" component={TaskList}/>
        </Switch>
    </ConnectedRouter>
);


export default Routes;