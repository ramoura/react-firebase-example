import React  from "react";

import Login from './Login'
import TaskList from './TaskList'

export default class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello Word</h1>
                <Login/>
                <TaskList />
            </div>
        );
    }

}