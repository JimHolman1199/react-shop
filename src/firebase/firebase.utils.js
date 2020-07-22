import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyAUANwCqaCorvCh_9Voh07kzpI_2cXc4-A",
    authDomain: "crwn-db-29cba.firebaseapp.com",
    databaseURL: "https://crwn-db-29cba.firebaseio.com",
    projectId: "crwn-db-29cba",
    storageBucket: "crwn-db-29cba.appspot.com",
    messagingSenderId: "419275703212",
    appId: "1:419275703212:web:69ebd31912d0bf8de37009",
    measurementId: "G-S939WC3RFF"
};

firebase.initializeApp(config);

export const createUserProfileDoc = async (userAuth, additinalData) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additinalData
            })
        }catch(err){
            console.log('error creating user', err.message)
        }
    }

    return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    
    const batch = firestore.batch();
    objectsToAdd.forEach(obj =>{
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj)
    })

    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformCollection = collections.docs.map(doc=>{
        const {title, items} = doc.data()
    
        return {
            routeName: encodeURI(title.toLowerCase()),
            id : doc.id,
            title,
            items
        }
    })

   return transformCollection.reduce((acc, collection)=>{
        acc[collection.title.toLowerCase()] = collection;
        return acc;
    }, {})
    
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
