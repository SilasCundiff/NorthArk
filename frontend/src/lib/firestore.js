import { firestore } from '../utils/firebase';

// custom firestore functions

export const createUserInFirebase = async (user) => {
  const userUid = user.uid;
  const email = user.email;
  const displayName = user.displayName;

  const userDocument = firestore.doc(`users/${userUid}`);

  await userDocument.get().then((docSnapshot) => {
    // Check if user already exists, if they do, no need to re-create the doc
    if (docSnapshot.exists) return;
    else {
      userDocument.set({
        email,
        displayName,
      }); // If the user doesn't exist, add them to the db.
    }
  });
};
