import React, {isValidElement} from 'react';

import {makeStyles, withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

import {firebaseAuth} from '../config/firebaseConfig'
import firebaseService from '../service/FirebaseService'
import PropTypes from "prop-types";



const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});


class TaskList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tasks: []
        }
        this.handleToggle = this.handleToggle.bind(this);

    }

    componentDidMount = () => {
        firebaseAuth.onAuthStateChanged(userAuth => {
            firebaseService.registerDBRealTime('users', (dataReceived) => {
                let tasks = dataReceived;
                this.setState({tasks: tasks.taskList});
            });
        });
    };

    handleToggle(value) {
        const {tasks} = this.state;
        const found = tasks.find(element => element.description === value.description);
        this.setState({tasks: tasks});
    }

    render() {
        const { classes } = this.props;
        const {tasks} = this.state;
        if (tasks.length === 0) {
            return <p>Nenhum item</p>
        }

        return (
            <List className={classes.root}>
                {tasks.map((value, index) => {
                    const labelId = `checkbox-list-label-${index}`;
                    return (
                        <ListItem key={index} role={undefined} dense button onClick={()=>this.handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={value.done}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value.description} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments">
                                    <CommentIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        );
    }
}

TaskList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskList);
