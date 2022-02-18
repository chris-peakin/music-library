const express = require('express');

const artistController = require('../controllers/artist.js');

const router = express.Router();

router.post('/', artistController.create);

module.exports = router;