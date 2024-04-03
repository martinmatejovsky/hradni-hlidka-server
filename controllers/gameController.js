const {LADDER_POSITIONS} = require("../constants/projectConstants");

exports.createNewGameInstance = async (req, res) => {
    if (!req.body.gameLocation) {
        return res.status(400).json({ message: 'Missing properties in request body' });
    }

    // create new object based on data from chosen Game Area and Hosting Player
    let gameInstance = {};
    gameInstance.id = req.body.gameLocation.key + Date.now().toString();
    gameInstance.gameState = 'ready';
    gameInstance.gameLocation = Object.assign(req.body.gameLocation);
    gameInstance.battleZones = [];
    gameInstance.players = [];
    let polygonsInGameArea = gameInstance.gameLocation.polygons

    polygonsInGameArea.forEach((polygon) => {
        if (polygon.polygonType === 'battleZone') {
            gameInstance.battleZones.push({
                zoneName: polygon.polygonName,
                key: polygon.key,
                cornerCoordinates: polygon.cornerCoordinates,
                conquered: false,
                guardians: [],
                assembledInvaders: [],
                assaultLadder: new Array(LADDER_POSITIONS).fill(null),
            })
        }
    });

    return res.status(200).json({ gameInstance });
}