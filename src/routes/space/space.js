const express = require('express');

const app = express();

const controller = require('../../database/controllers');

app.post('/create-space', async(req, res) => {
    const { space_name } = req.body;
    const uid = req.session.uid;

    controller.spaces.createSpace(uid, { space_name: space_name });

    return res.json({
        message: 'Espaço criado com sucesso!'
    });
});

app.get('/get-home-spaces-famous', async(req, res) => {
    const response = await controller.spaces.getSpacesFamous();

    console.log(response);

    return res.json(response);
});

app.get('/get-home-spaces-news', async(req, res) => {
    const response = await controller.spaces.getSpacesRecents();

    return res.json(response);
});

app.post('/add-space-like', async(req, res) => {
    const { space_id } = req.body;
    const user_id = req.session.uid;

    await controller.spaces.addLikeInSpace(space_id);
    await controller.likes.setLike({ userId: user_id, spaceId: space_id });

    return res.status(200).end();
});

app.post('/remove-space-like', async(req, res) => {
    const { space_id } = req.body;
    const user_id = req.session.uid;

    await controller.spaces.removeLikeInSpace(space_id);
    await controller.likes.deleteLike({ userId: user_id, spaceId: space_id });

    return res.status(200).end();
});

app.post('/check-space-liked', async(req, res) => {
    const { space_id } = req.body;
    const user_id = req.session.uid;

    var response = await controller.likes.checkSpaceLiked({
        userId: user_id,
        spaceId: space_id
    });

    console.log('RESPONSE: ' + JSON.stringify(response).length);

    if (JSON.stringify(response).length > 0) {
        response = true;
    } else {
        response = false;
    }

    return res.json({ space_liked: response });
});

module.exports = app;