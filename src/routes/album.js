const express = require('express');

const albumController = require('../controllers/album.js');

const router = express.Router();

router.post('/artist/:artistId', albumController.create);

module.exports = router;