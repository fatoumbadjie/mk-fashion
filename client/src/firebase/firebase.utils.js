import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
    
        apiKey: "AIzaSyBgcd3KAVt8QlDupQbXagzowJ-wYklV9jQ",
        authDomain: "crown-db-35ef1.firebaseapp.com",
        projectId: "crown-db-35ef1",
        storageBucket: "crown-db-35ef1.appspot.com",
        messagingSenderId: "235839991295",
        appId: "1:235839991295:web:ea043e0abfcb2a85130bca"
      
};

export const createUserProfileDocument = async(userAuth, additionalDate) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

if(!snapShot.exists){
    const {displayName,email} = userAuth;
    const createdAt = new Date();
    
    try{
        await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalDate
        })
    }
    catch{
        console.log('error creating user');
    }
}
return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;