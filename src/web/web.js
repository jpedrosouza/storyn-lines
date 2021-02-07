const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();

const ModelUser = require('../database/models/user_model');
const PasswordManager = require('../utils/password_manager');

app.use(express.static(path.join(__dirname, '/../../public')));
app.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: false }));
app.set('views', __dirname + '/views');
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
    return res.render('index');
});

app.post('/create-account', async(req, res) => {
    const { username, email, password } = req.body;

    const password_salt = PasswordManager.generateSalt();
    const password_hash = PasswordManager.sha512(password, password_salt);

    // Create a user in Database
    await ModelUser.createUser(username, email, password_salt, password_hash);

    return res.render('index');
});

app.post('/auth', async(req, res) => {
    const { email, password } = req.body;

    const userData = await ModelUser.getUserByEmail(email);

    if (userData.length == 0) {
        return res.json({
            message: 'Usuário ou senha incorretos.',
            code: 0,
        });
    }

    const uid = userData[0]['id'];
    const username = userData[0]['username'];
    const passwordSalt = userData[0]['password_salt'];
    const passwordHash = userData[0]['password_hash'];

    const generatedPasswordHash = await PasswordManager.validatePassword(password, passwordSalt);

    if (passwordHash == generatedPasswordHash) {
        req.session.loggedin = true;
        req.session.username = username;
        req.session.uid = uid;

        return res.json({
            message: 'Login realizado com sucesso!',
            code: 1,
        });
    } else {
        return res.json({
            message: 'Usuário ou senha incorretos.',
            code: 0,
        });
    }
});

app.get('/registrar', (req, res) => {
    return res.render('register');
});

app.get('/inicio', (req, res) => {
    if (req.session.loggedin) {
        return res.render('home');
    } else {
        return res.render('index');
    }
});

app.get('/space', async(req, res) => {
    const spaceId = req.query.id;

    return res.render('space', { space_id: spaceId });
});

module.exports = app;