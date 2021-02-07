require('dotenv/config')
const Sequelize = require('sequelize');

function initDatabase() {
    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    });

    sequelize.authenticate().then(() => {
        console.log('Connected with success!')
    }).catch((err) => {
        console.log('Connection failed!')
    });
}

module.exports = { initDatabase };