const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get("/", gameController.getGameInstance);
router.post("/createGame", gameController.createNewGameInstance);
router.get("/checkGameStatus", gameController.checkGameStatus);
router.post("/start", gameController.startGame); // Pass io instance to the controller method

module.exports = router;