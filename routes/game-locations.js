const express = require('express');
const router = express.Router();
const gameLocationsController = require('../controllers/gameLocationsController');

router.get("/", gameLocationsController.getGameLocations);

module.exports = router;