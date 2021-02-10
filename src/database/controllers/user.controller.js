const db = require('../init_database');

exports.createUser = (user) => {
    db.users.create({
            'username': user.username,
            'email': user.email,
            'password_salt': user.password_salt,
            'password_hash': user.password_hash,
        })
        .then((user) => {
            console.log(">> Created user: " + JSON.stringify(user, null, 4));
            return user;
        })
        .catch((err) => {
            console.log(">> Error while creating user: ", err);
        });
};

exports.getUserByEmail = (email) => {
    return db.users.findAll({
        where: {
            email: email,
        },
    });
}