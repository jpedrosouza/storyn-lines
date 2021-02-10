const express = require('express');

const app = express();

const controller = require('../../database/controllers');

app.post('/get-posts', async(req, res) => {
    const { space_id } = req.body;

    const response = await controller.posts.findPostsBySpaceId(space_id);

    return res.json(response);
});

app.post('/create-post', async(req, res) => {
    const { space_id, content } = req.body;
    const uid = req.session.uid;

    await controller.posts.createPost(space_id, {
        uid: uid,
        content: content,
    });

    return res.json({
        message: 'Post criado com sucesso!',
        code: 0
    });
});

module.exports = app;