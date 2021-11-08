import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDyuYMot6PZDx9yu5EhXF1Ui3u_Tb6qAvQ",
    authDomain: "northark.firebaseapp.com",
    projectId: "northark",
    storageBucket: "northark.appspot.com",
    messagingSenderId: "662000079648",
    appId: "1:662000079648:web:7d0d950bb2b25ce9a9bd45",
    measurementId: "G-LL9KC3KK78"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

// exporting the auth and google oauth objects to be used elsewhere
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;