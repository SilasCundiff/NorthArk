// define custom middleware here

const admin = require('firebase-admin');

// Gets the idToken and decodes it
module.exports = async function getIdToken(req, res, next) {
  if (req.headers?.authorization?.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req['currentUser'] = decodedToken;
    } catch (error) {
      console.log(error);
    }
  }

  next();
};
