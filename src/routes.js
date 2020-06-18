import React from "react";

import {BrowserRouter, Link, Redirect, Route, Switch} from "react-router-dom";

import Login from "./components/Login";
import TaskList from "./components/TaskList";

import firebaseService from "./service/FirebaseService";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={ props =>
                firebaseService.isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

const Routes = () => (
    <BrowserRouter>
        <ul>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/tasks">Lista de taferas</Link>
            </li>
        </ul>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/login" component={Login}/>
            <PrivateRoute path="/tasks" component={TaskList}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;