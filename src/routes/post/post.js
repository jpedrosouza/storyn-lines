const express = require('express');

const app = express();

const PostModel = require('../../database/models/post_model');

app.post('/get-posts', async(req, res) => {
    const { space_id } = req.body;

    const response = await PostModel.getPosts(space_id);

    return res.json(response);
});

app.post('/create-post', async(req, res) => {
    const { space_id, content } = req.body;
    const uid = req.session.uid;

    await PostModel.createPost(space_id, uid, content);

    return res.json({
        message: 'Post criado com sucesso!',
        code: 0
    });
});

module.exports = app;