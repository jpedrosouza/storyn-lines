module.exports = (sequelize, DataTypes) => {
    const UserModel = sequelize.define('users', {
        'username': DataTypes.STRING,
        'email': DataTypes.STRING,
        'password_salt': DataTypes.STRING,
        'password_hash': DataTypes.STRING,
    });

    return UserModel;
}