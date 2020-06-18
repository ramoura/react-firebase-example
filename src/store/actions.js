import { push } from "connected-react-router";

export const signIn = () => dispatch => {
    return new Promise(resolve =>
        setTimeout(() => {
            console.log("Go!");
            dispatch(push("/about"));
        }, 3000)
    );
};

export const increment = () => ({
    type: 'INCREMENT',
})

export const decrement = () => ({
    type: 'DECREMENT',
})