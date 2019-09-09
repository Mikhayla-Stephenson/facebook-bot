const express = require('express');
const bodyParser = require('body-parser');
const cool = require('cool-ascii-faces');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const verifyWebhook = require('./verify-webhook');
const messageWebhook = require('./message-webhook');

app.post('/', messageWebhook);
app.get('/', verifyWebhook);
app.get('/cool', (req, res) => res.send(cool()));

app.listen(5000, () => console.log('Express server is listening on port 5000'));
