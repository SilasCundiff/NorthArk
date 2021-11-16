const express = require('express');
const admin = require('firebase-admin/app');
const plaid = require('plaid');
const cors = require('cors');
const getIdToken = require('./middleware');
require('dotenv').config({ path: __dirname + `/.env` });

const CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;

admin.initializeApp({ credential: admin.applicationDefault(CREDENTIALS) });

const app = express();

// TODO move port to .env file
const port = 8080;

// ========Middleware========

// TODO configure cors to only allow front-end url to improve security
app.use(cors());
app.use(getIdToken);

// ========Routes========

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/test', (req, res) => {
  // Can pull the user id and more off of the user object to be used with plaid
  const user = req['currentUser'];
  const testData = { id: 1, first: 'John', last: 'Doe', balance: 100 };

  // verify user is logged in.
  if (!user) {
    res.status(403).send('You must be logged in!');
  } else {
    res.send(JSON.stringify(testData));
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
