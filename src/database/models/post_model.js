const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const UserModel = require('./user_model');

const PostModel = sequelize.define('posts', {
    'author_id': {
        type: Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        }
    },
    'space_id': {
        type: Sequelize.INTEGER,
        references: {
            model: 'spaces',
            key: 'id',
        }
    },
    'content': Sequelize.TEXT,
});

async function getPosts(spaceId) {
    return PostModel.findAll({
        where: {
            space_id: spaceId
        },
        include: [{
            model: UserModel,
            as: "users",
            attributes: [
                ["username"],
            ],
        }],
    });
}

async function createPost(spaceId, uid, content) {
    await PostModel.create({
        'author_id': uid,
        'space_id': spaceId,
        'content': content,
    });
}

// PostModel.sync({ force: true });

module.exports = { getPosts, createPost };