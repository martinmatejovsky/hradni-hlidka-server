const { mockGameInstance } = require('../mock-data/gameInstance');
let gameInstance = {...mockGameInstance}

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
    return gameInstance;
}