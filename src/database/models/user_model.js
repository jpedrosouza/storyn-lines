const Sequelize = require('sequelize');
const { sha512 } = require('../../utils/password_manager');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const UserModel = sequelize.define('users', {
    'username': Sequelize.STRING,
    'email': Sequelize.STRING,
    'password_salt': Sequelize.STRING,
    'password_hash': Sequelize.STRING,
});

async function createUser(username, email, password_salt, password_hash) {
    await UserModel.create({
        'username': username,
        'email': email,
        'password_salt': password_salt,
        'password_hash': password_hash,
    });
}

async function getUserByEmail(email) {
    return UserModel.findAll({
        where: {
            email: email,
        },
    });
}

module.exports = { createUser, getUserByEmail };

// UserModel.sync({ force: true });