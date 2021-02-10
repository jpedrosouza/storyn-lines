const controller = {};

controller.users = require('./controllers/user.controller');
controller.spaces = require('./controllers/space.controller');
controller.posts = require('./controllers/post.controller');
controller.likes = require('./controllers/like.controller');

module.exports = controller;