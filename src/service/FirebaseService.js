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
            let tasks = []
            dataSnapshot.child("taskList").forEach(task => {
                tasks.push({...task.val(), key: task.key});
            })

            let data = dataSnapshot.val();
            data['taskList'] = tasks;
            console.log(data)

            callback(data);
        });
    };

    static makeQuery(nodePath, size) {
        let email = firebaseAuth.currentUser.email.replace(/[^a-zA-Z0-9 ]/g, "");
        let query = firebaseDatabase.ref(nodePath + '/' + email)
            .limitToLast(size);
        return query;
    }

    static removeTask = (id) => {
        let email = firebaseAuth.currentUser.email.replace(/[^a-zA-Z0-9 ]/g, "");
        return firebaseDatabase.ref(`users/${email}/taskList/${id}`).remove();
    };

    static addNewTask(newTask) {
        let email = firebaseAuth.currentUser.email.replace(/[^a-zA-Z0-9 ]/g, "");
        const ref = firebaseDatabase.ref(`users/${email}/taskList`).push();
        ref.set(newTask);
    }

    static updateData = (id, obj) => {
        let email = firebaseAuth.currentUser.email.replace(/[^a-zA-Z0-9 ]/g, "");
        return firebaseDatabase.ref(`users/${email}/taskList/${id}`).set({...obj});
    };
}