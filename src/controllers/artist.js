const express = require('express');
const app = require('../app');
const artist = express();

artist.use(express.json());

exports.create = (req, res) => {
    res.sendStatus(201);
};

