import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { browserSessionPersistence, setPersistence } from 'firebase/auth';

// create a file named firebase-config-object.js in the utils folder
// copy and paste the firebaseconfig that is provided on your firebase northark project
// make sure to add the export keyword before the const keyword.
import { firebaseConfig } from './firebase-config-object';

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
setPersistence(auth, browserSessionPersistence);
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
