const db = require('../init_database');

exports.createPost = (spaceId, post) => {
    db.posts.create({
            'userId': post.uid,
            'spaceId': spaceId,
            'content': post.content,
        })
        .then((post) => {
            console.log(">> Created comment: " + JSON.stringify(post, null, 4));
            return post;
        })
        .catch((err) => {
            console.log(">> Error while creating post: ", err);
        });
};

exports.findPostsByPk = (id) => {
    return db.posts.findByPk(id, { include: ['space'] })
        .then((post) => {
            return post;
        })
        .catch((err) => {
            console.log(">> Error while finding post: ", err);
        });
}

exports.findPostsBySpaceId = (spaceId) => {
    return db.posts.findAll({
        where: {
            spaceId: spaceId
        },
        include: ['users']
    })
}