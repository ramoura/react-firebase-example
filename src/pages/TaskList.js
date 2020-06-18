import React from 'react';

import {firebaseAuth} from '../config/firebaseConfig'
import firebaseService from '../service/FirebaseService'

export default class TaskList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tasks: []
        }


        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount = () => {
        firebaseAuth.onAuthStateChanged(userAuth => {
            this.handleClick(null);
        });
    };

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleClick(e) {
        firebaseService.registerDBRealTime('users', (dataReceived) => {
            let tasks = dataReceived;
            console.log(1, tasks);
            this.setState({tasks: tasks.taskList});
        });
    }

    renderRow(row) {
        return (
        <li>
            <input type="checkbox" checked={row.done} />
            {row.description}

        </li>
        )
    }
    render() {
        const {tasks} = this.state;
        if (tasks.length === 0) {
            return <p>Nenhum item</p>
        }

        return (
            <div>
                <ul>{tasks.map(this.renderRow)}</ul>
            </div>
        );
    }

}

