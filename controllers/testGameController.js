const { mockGameInstance } = require('../mock-data/gameInstance');
let gameInstance = {...mockGameInstance}

module.exports.testGameInstance = (req, res) => {
    return res.status(200).json({ ...gameInstance });
}

module.exports.joinNewPlayer = (req) => {
    gameInstance.players.push(req.body.player);
}