const db = require('../init_database');

exports.setLike = (like) => {
    db.likes.create({
        'userId': like.userId,
        'spaceId': like.spaceId,
    });
}

exports.deleteLike = (like) => {
    db.likes.destroy({
        where: {
            'userId': like.userId,
            'spaceId': like.spaceId,
        }
    });
}

exports.checkSpaceLiked = (like) => {
    return db.likes.findAll({
            where: {
                'userId': like.userId,
                'spaceId': like.spaceId,
            }
        }).then((likes) => {
            return likes;
        })
        .catch((err) => {
            console.log(">> Error while finding likes: ", err);
        });
}