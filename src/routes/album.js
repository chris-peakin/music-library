const express = require('express');

const albumController = require('../controllers/album.js');

const router = express.Router();

router.post('/', albumController.create);

router.get('/', albumController.read);

router.get('/:albumId', albumController.readSingle);

router.patch('/:albumId', albumController.update);

router.delete('/:albumId', albumController.delete);

module.exports = router;