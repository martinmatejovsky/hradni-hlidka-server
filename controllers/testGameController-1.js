const { mockGameInstance } = require('../mock-data/gameInstance');
let gameInstance = {...mockGameInstance}
const gameUpdateInterval = 2000;
let gameUpdateIntervalId = null;

module.exports.getGameInstance

module.exports.getGameInstance = (req, res) => {
    return res.status(200).json({ ...gameInstance });
}

module.exports.joinNewPlayer = (player) => {
    gameInstance.players.push(player);
    return gameInstance;
}

module.exports.removePlayer = (player) => {
    gameInstance.players = gameInstance.players.filter((item) => item.key !== player.key);
    if (gameInstance.players.length === 0) {
        if (gameUpdateIntervalId) clearInterval(gameUpdateIntervalId);
        // TODO: in real app it should delete whole javascript file, not just set state "ready"
        gameInstance.gameState = 'ready';
    }
    return gameInstance;
}

module.exports.startGame = (req, res, io) => {
    const gameId = req.body.gameId;

    gameInstance.gameState = 'running';
    io.to(gameId).emit('gameStarted', gameInstance);
    updateGame(gameId, io);
}

function updateGame(gameId, io) {
    clearInterval(gameUpdateIntervalId);

    gameUpdateIntervalId = setInterval(() => {
        io.to(gameId).emit('gameUpdated', gameInstance);
    }, gameUpdateInterval);
}