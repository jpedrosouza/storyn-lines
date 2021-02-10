require('dotenv/config')
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./models/user_model')(sequelize, Sequelize);
db.spaces = require('./models/space_model')(sequelize, Sequelize);
db.posts = require('./models/post_model')(sequelize, Sequelize);
db.likes = require('./models/like_model')(sequelize, Sequelize);

db.users.hasMany(db.spaces, { as: 'space' });
db.spaces.belongsTo(db.users, { foreignKey: 'userId', as: 'users' });

db.spaces.hasMany(db.posts, { as: 'post' });
db.posts.belongsTo(db.spaces, { foreignKey: 'spaceId', as: 'spaces' });

db.users.hasMany(db.posts, { as: 'post' });
db.posts.belongsTo(db.users, { foreignKey: 'userId', as: 'users' });

db.users.hasMany(db.likes, { as: 'like' });
db.likes.belongsTo(db.users, { foreignKey: 'userId', as: 'users' });

db.spaces.hasMany(db.likes, { as: 'like' });
db.likes.belongsTo(db.spaces, { foreignKey: 'spaceId', as: 'spaces' });


sequelize.authenticate().then(() => {
    console.log('Connected with success!')
}).catch((err) => {
    console.log('Connection failed!')
});


module.exports = db;