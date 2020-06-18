import {firebaseDatabase} from '../config/firebaseConfig'
import {firebaseAuth} from '../config/firebaseConfig'

export default class FirebaseService {

    static isAuthenticated = () => firebaseAuth.currentUser != null
    static logout = () => {
        firebaseAuth.signOut();
    }
    static loginFirebase = (username, password, callBack) => {
        firebaseAuth.signInWithEmailAndPassword(username, password)
            .then(value => callBack(null, value))
            .catch( error => callBack(error));
    };
    static registerDBRealTime = (nodePath, callback, size = 10) => {
        if(!this.isAuthenticated()){ return console.log("Usuário não logado")}
        let query = this.makeQuery(nodePath, size);
        query.on('value', dataSnapshot => {
            callback(dataSnapshot.val());
        });
    };

    static getDataInDB = (nodePath, callback, size = 10) => {
        if(!this.isAuthenticated()){ return console.log("Usuário não logado")}
        let query = this.makeQuery(nodePath, size);
        query.once('value').then(dataSnapshot => {
            callback(dataSnapshot.val());
        });
    };

    static makeQuery(nodePath, size) {
        let email = firebaseAuth.currentUser.email.replace(/[^a-zA-Z0-9 ]/g, "");
        let query = firebaseDatabase.ref(nodePath + '/' + email)
            .limitToLast(size);
        return query;
    }
}