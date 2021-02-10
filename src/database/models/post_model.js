module.exports = (sequelize, DataTypes) => {
    const PostModel = sequelize.define('posts', {
        'content': DataTypes.TEXT,
    });

    return PostModel;
}

// async function createPost(spaceId, uid, content) {
//     await PostModel.create({
//         'author_id': uid,
//         'space_id': spaceId,
//         'content': content,
//     });
// }

// // PostModel.sync({ force: true });

// module.exports = { getPosts, createPost };