module.exports = (sequelize, DataTypes) => {
    const SpaceModel = sequelize.define('spaces', {
        'space_name': DataTypes.TEXT,
        'posts': DataTypes.INTEGER,
        'likes': DataTypes.INTEGER
    });

    return SpaceModel;
}