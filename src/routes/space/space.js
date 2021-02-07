const express = require('express');

const app = express();

const SpaceModel = require('../../database/models/space_model');

app.post('/create-space', async(req, res) => {
    const { space_name } = req.body;
    const uid = req.session.uid;

    await SpaceModel.createSpace(uid, space_name);

    return res.json({
        message: 'Espaço criado com sucesso!'
    });
});

app.get('/get-home-spaces-famous', async(req, res) => {
    const response = await SpaceModel.getSpaceFamous();

    return res.json(response);
});

app.get('/get-home-spaces-news', async(req, res) => {
    const response = await SpaceModel.getSpacesRecents();

    return res.json(response);
});

module.exports = app;