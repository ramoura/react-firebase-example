import firebase from 'firebase';

const config = {
    apiKey: '',
    projectId: '',
    authDomain: '',
    databaseURL: '',
    storageBucket: '',
    messagingSenderId: ''
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();