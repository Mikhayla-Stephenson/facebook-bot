const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const verifyWebhook = require('./verify-webhook');
const messageWebhook = require('./message-webhook');

app.post('/', messageWebhook);
app.get('/', verifyWebhook);

app.listen(5000, () => console.log('Express server is listening on port 5000'));
