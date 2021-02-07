const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const SpaceModel = sequelize.define('spaces', {
    'owner_id': Sequelize.INTEGER,
    'space_name': Sequelize.TEXT,
    'posts': Sequelize.INTEGER,
    'likes': Sequelize.INTEGER
});

async function createSpace(ownerId, spaceName) {
    await SpaceModel.create({
        'owner_id': ownerId,
        'space_name': spaceName,
        'posts': 0,
        'likes': 0
    });
}

async function getSpacesRecents() {
    return SpaceModel.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
    });
}

async function getSpaceFamous() {
    return SpaceModel.findAll({
        order: [
            ['likes', 'DESC']
        ],
    });
}

module.exports = { createSpace, getSpacesRecents, getSpaceFamous };