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

    await controller.spaces.addLikeInSpace(space_id);

    return res.status(200).end();
});

app.post('/remove-space-like', async(req, res) => {
    const { space_id } = req.body;

    await controller.spaces.removeLikeInSpace(space_id);

    return res.status(200).end();
});

module.exports = app;