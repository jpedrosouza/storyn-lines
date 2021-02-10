module.exports = (sequelize, DataType) => {
    const LikeModel = sequelize.define('likes', {
        'userId': DataType.INTEGER,
        'spaceId': DataType.INTEGER,
    });

    return LikeModel;
}