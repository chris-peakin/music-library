const express = require('express');
const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/album');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).json({ result: 'hello world'});
});

app.use('/artist', artistRouter);

app.use('/album', albumRouter);

module.exports = app;