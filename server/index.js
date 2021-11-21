const express = require('express');
const admin = require('firebase-admin/app');
const cors = require('cors');
const getIdToken = require('./middleware');
require('dotenv').config({ path: __dirname + `/.env` });
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const { CREDENTIALS, PLAID_CLIENT_ID, PLAID_SECRET, PLAID_ENV, PLAID_REDIRECT_URI } = process.env;
const PLAID_PRODUCTS = process.env.PLAID_PRODUCTS.split(',');
const PLAID_COUNTRY_CODES = process.env.PLAID_COUNTRY_CODES.split(',');

const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
});

const corsOptions = {
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const client = new PlaidApi(configuration);

admin.initializeApp({ credential: admin.applicationDefault(CREDENTIALS) });

const app = express();

// TODO move port to .env file
const port = 8080;

// ========Middleware========

// TODO configure cors to only allow front-end url to improve security
app.use(cors(corsOptions));
app.use(getIdToken);
app.use(express.json());

// ========Routes========

//TODO test route, delete later
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

//TODO test route, delete later
app.post('/api/testpost', (req, res) => {
  res.send(JSON.stringify({ message: 'okay' }));
});

app.post('/api/create-link-token', async (req, res) => {
  // TODO fix headers
  const user = req['user_id'];
  console.log('user :>> ', user);
  const config = {
    user: {
      client_user_id: 'user_id',
    },
    client_name: 'Plaid Quickstart',
    products: PLAID_PRODUCTS,
    country_codes: PLAID_COUNTRY_CODES,
    language: 'en',
  };
  try {
    const createTokenResponse = await client.linkTokenCreate(config);
    return res.json(createTokenResponse.data);
  } catch (error) {
    console.log(error);
  }
});

app.post('/api/set_access_token', async (req, res) => {
  const publicToken = await req.body.public_token;
  console.log('=====================================');
  console.log('public token', publicToken);
  console.log('=====================================');
  try {
    const tokenResponse = await client.itemPublicTokenExchange({
      public_token: publicToken,
    });
    console.log(tokenResponse.data);
    return res.json(tokenResponse.data);
  } catch (error) {
    console.log('error');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
