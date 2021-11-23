// define custom middleware here

const admin = require('firebase-admin');

// Gets the idToken and decodes it
// update to auto reject if no token is found or if token is bad
module.exports = async function getIdToken(req, res, next) {
  if (!req.headers.authorization) {
    res.status(403).send('No credentials sent');
    return;
  }
  if (req.headers?.authorization?.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    const checkRevoked = true;
    await admin
      .auth()
      .verifyIdToken(idToken, checkRevoked)
      .then((user) => (req['user_id'] = user.user_id))
      .catch((err) => {
        if (err.code === 'auth/id-token-revoked') {
          res.status(403).send('Please login again to access this resource!');
          return;
        } else {
          res.status(403).send('You must be logged in to access this resource!');
          return;
        }
      });
  }

  next();
};
