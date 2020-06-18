import {firebaseDatabase} from '../config/firebaseConfig'
import {firebaseAuth} from '../config/firebaseConfig'

export default class FirebaseService {
    static loginFirebase = (username, password, callBack) => {
        firebaseAuth.signInWithEmailAndPassword(username, password)
            .then(value => callBack(null, value))
            .catch( error => callBack(error));
    };
    static getDataList = (nodePath, callback, size = 10) => {
        let query = firebaseDatabase.ref(nodePath)
            .limitToLast(size);
        query.on('value', dataSnapshot => {
            console.log(dataSnapshot)
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                items.push(item);
            });
            callback(items);
        });

        return query;
    };

}