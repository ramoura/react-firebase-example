import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDHiOxx_JL1kjaUxQiB5H8QwwL7ZN9DBqQ",
    authDomain: "react-example-1ff6f.firebaseapp.com",
    databaseURL: "https://react-example-1ff6f.firebaseio.com",
    projectId: "react-example-1ff6f",
    storageBucket: "react-example-1ff6f.appspot.com",
    messagingSenderId: "92959534150",
    appId: "1:92959534150:web:6c90fc4a29d573ff90ee47",
    measurementId: "G-JZ0GYEEF91"
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseAuth = firebase.auth();
export const firebaseDatabase = firebase.database();