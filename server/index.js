const express = require('express');
const plaid = require('plaid');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/test', (req, res) => {
  res.send({ id: 1, first: 'John', last: 'Doe', balance: 100 });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
