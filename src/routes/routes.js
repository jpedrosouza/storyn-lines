const express = require('express');

const app = express();

const webRoute = require('../web/web');
const spaceRoute = require('./space/space');
const postRoute = require('./post/post');

app.use('/', webRoute);
app.use('/space', spaceRoute);
app.use('/post', postRoute);

module.exports = app;