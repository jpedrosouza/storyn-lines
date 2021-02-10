module.exports = (sequelize, DataTypes) => {
    const PostModel = sequelize.define('posts', {
        'content': DataTypes.TEXT,
    });

    return PostModel;
}