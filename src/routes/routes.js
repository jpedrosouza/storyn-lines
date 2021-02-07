const express = require('express');

const app = express();

const webRoute = require('../web/web');
const spaceRoute = require('./space/space');

app.use('/space', spaceRoute);
app.use('/', webRoute);

module.exports = app;