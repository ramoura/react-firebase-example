import React, {useEffect, useState} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import {firebaseAuth} from '../config/firebaseConfig'
import firebaseService from '../service/FirebaseService'
import Paper from "@material-ui/core/Paper";
import {PlaylistAdd} from "@material-ui/icons";
import InputBase from "@material-ui/core/InputBase";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    rootAdd: {
        width: '100%',
        maxWidth: 360,
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));


export default function TaskList() {
    const classes = useStyles();
    const [tasks, setTasks] = useState([])
    const [values, setValues] = React.useState({
        newTask: ''
    });

    function handleChange(event) {
        const {name, value} = event.target;
        setValues({...values, [name]: value});
    }

    useEffect(() => {
        firebaseAuth.onAuthStateChanged(userAuth => {
            firebaseService.registerDBRealTime('users', (dataReceived) => {
                console.log(dataReceived)
                let tasks = dataReceived;
                setTasks(tasks.taskList);
            });
        });
    }, [])

    function handleToggle(value) {
        const newValue = {...value}
        delete newValue.key;
        newValue.done = !value.done;
        firebaseService.updateData(value.key, newValue)
    }

    function handleRemove(value) {
        firebaseService.removeTask(value.key)
    }

    function submit(event) {
        event.preventDefault();
        console.log(values.newTask);
        firebaseService.addNewTask({description: values.newTask, done: false})
    }

    if (tasks.length === 0) {
        return <p>Nenhum item</p>
    }

    return (
        <>
            <List className={classes.root}>
                {tasks.map((value, index) => {
                    const labelId = `checkbox-list-label-${index}`;

                    return (
                        <ListItem key={index} role={undefined} dense button onClick={() => handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={value.done}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value.description}/>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments" onClick={() => handleRemove(value)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>

                <Paper component="form" className={classes.rootAdd}>
                    <InputBase
                        className={classes.input}
                        name="newTask"
                        placeholder="Add new task"
                        inputProps={{'aria-label': 'search google maps'}}
                        onChange={handleChange}

                    />
                    <IconButton edge="end" aria-label="comments" onClick={submit}>
                        <PlaylistAdd/>
                    </IconButton>
                </Paper>
        </>
    );
}
