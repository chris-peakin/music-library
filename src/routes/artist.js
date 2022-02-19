const express = require('express');

const artistController = require('../controllers/artist.js');

const router = express.Router();

router.post('/', artistController.create);

router.get('/', artistController.read);

router.get('/:artistId', artistController.readSingle);

router.patch('/', artistController.update);

module.exports = router;