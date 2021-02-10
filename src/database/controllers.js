const controller = {};

controller.users = require('./controllers/user.controller');
controller.spaces = require('./controllers/space.controller');
controller.posts = require('./controllers/post.controller');

module.exports = controller;