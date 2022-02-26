const express = require('express');

const albumController = require('../controllers/album.js');

const router = express.Router();

router.post('/artist/:artistId', albumController.create);

router.get('/album', albumController.readSingle);

router.get('/album/:albumId', albumController.read);

router.patch('/album/:albumId', albumController.update);

router.delete('/album/:albumId', albumController.delete);

module.exports = router;