// const Sequelize = require('sequelize');

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'mysql'
// });

module.exports = (sequelize, DataTypes) => {
    const SpaceModel = sequelize.define('spaces', {
        'space_name': DataTypes.TEXT,
        'posts': DataTypes.INTEGER,
        'likes': DataTypes.INTEGER
    });

    return SpaceModel;
}

// async function createSpace(ownerId, spaceName) {
//     await SpaceModel.create({
//         'owner_id': ownerId,
//         'space_name': spaceName,
//         'posts': 0,
//         'likes': 0
//     });
// }

// async function getSpacesRecents() {
//     return SpaceModel.findAll({
//         order: [
//             ['createdAt', 'DESC']
//         ],
//     });
// }

// async function getSpaceFamous() {
//     return SpaceModel.findAll({
//         order: [
//             ['likes', 'DESC']
//         ],
//     });
// }

// module.exports = { createSpace, getSpacesRecents, getSpaceFamous };