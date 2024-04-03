const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const gameController = require('../controllers/gameController');
const testGameController = require('../controllers/testGameController');

router.post("/", gameController.createNewGameInstance);
router.post("/1/start", (req) => {
    testGameController.startGame(req, req.app.get('io')); // Pass io instance to the controller method
});
router.get("/:gameInstanceId", (req, res) => {
    const gameInstanceId = req.params.gameInstanceId;
    const gameInstanceFilePath = path.join(__dirname, `../game-instances/${gameInstanceId}.ts`);

    if (!fs.existsSync(gameInstanceFilePath)) {
        return res.status(404).json({ message: 'Game instance not found' });
    }

    const gameController = require(gameInstanceFilePath);
    const gameInstance = gameController.getGameInstance();

    return res.status(200).json({ ...gameInstance });
})

module.exports = router;