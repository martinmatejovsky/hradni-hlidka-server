const { mockGameInstance } = require('../mock-data/gameInstance');

module.exports.testGameInstance = (req, res) => {
    let gameInstance = {...mockGameInstance}

    return res.status(200).json({ ...gameInstance });
}