const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

const db = require('./src/database/init_database');
const routes = require('./src/routes/routes');

app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());

app.use('/', routes);

const server = app.listen(8080, () => {
    const host = server.address().address;
    const port = server.address().port;

    db.sequelize.sync();

    console.log(`Server listening at https://${host}:${port}`);
});