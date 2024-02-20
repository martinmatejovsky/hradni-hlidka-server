const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const gameController = require('../controllers/gameController');
const testGameController = require('../controllers/testGameController-1');

router.post("/", gameController.createNewGameInstance);
router.get("/1", testGameController.testGameInstance);
router.get("/:gameInstanceId", (req, res) => {
    const gameInstanceId = req.params.gameInstanceId;
    const gameInstanceFilePath = path.join(__dirname, `../game-instances/${gameInstanceId}.js`);

    if (!fs.existsSync(gameInstanceFilePath)) {
        return res.status(404).json({ message: 'Game instance not found' });
    }

    const gameInstance = require(gameInstanceFilePath);

    return res.status(200).json({ ...gameInstance });
});

module.exports = router;