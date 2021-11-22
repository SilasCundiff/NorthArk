const express = require('express');
const admin = require('firebase-admin/app');
const cors = require('cors');
const getIdToken = require('./middleware');
require('dotenv').config({ path: __dirname + `/.env` });
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const { CREDENTIALS, PLAID_CLIENT_ID, PLAID_SECRET, PLAID_ENV, PORT } = process.env;
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
  origin: 'http://localhost:3000',
};

const client = new PlaidApi(configuration);

admin.initializeApp({ credential: admin.applicationDefault(CREDENTIALS) });

const app = express();

const port = PORT || 8080;

// ========Middleware========

app.use(cors(corsOptions));
app.use(getIdToken);
app.use(express.json());

// ========Routes========

app.post('/api/create-link-token', async (req, res) => {
  const user = req['user_id'];
  const config = {
    user: {
      client_user_id: user,
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
  try {
    const tokenResponse = await client.itemPublicTokenExchange({
      public_token: publicToken,
    });
    return res.json(tokenResponse.data);
  } catch (error) {
    console.log('error');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
