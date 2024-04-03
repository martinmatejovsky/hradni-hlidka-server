const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const testGameController = require('../controllers/testGameController');

router.post("/", gameController.createNewGameInstance);
router.post("/1/start", (req) => {
    testGameController.startGame(req, req.app.get('io')); // Pass io instance to the controller method
});

module.exports = router;