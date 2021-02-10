const db = require('../init_database');
const Sequelize = require('sequelize');

exports.createSpace = (userId, space) => {
    db.spaces.create({
            'userId': userId,
            'space_name': space.space_name,
            'posts': 0,
            'likes': 0
        })
        .then((space) => {
            console.log(">> Created comment: " + JSON.stringify(space, null, 4));
            return space;
        })
        .catch((err) => {
            console.log(">> Error while creating space: ", err);
        });
};

exports.findSpaceById = (id) => {
    return db.spaces.findByPk(id)
        .then((space) => {
            return space;
        })
        .catch((err) => {
            console.log(">> Error while finding space: ", err);
        });
};

exports.getSpacesFamous = () => {
    return db.spaces.findAll({
        order: [
            ['likes', 'DESC']
        ],
        include: ["users"],
    });
}

exports.getSpacesRecents = () => {
    return db.spaces.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        include: ["users"],
    });
}

exports.addLikeInSpace = (spaceId) => {
    return db.spaces.update({
        'likes': Sequelize.literal('likes + 1')
    }, {
        where: {
            id: spaceId
        },
    });
}

exports.removeLikeInSpace = (spaceId) => {
    return db.spaces.update({
        'liked': Sequelize.literal('likes - 1')
    }, {
        where: {
            id: spaceId
        },
    })
}