const fs = require('fs');
const path = require('path');

exports.createNewGameInstance = (req, res) => {
    if (!req.body.gameLocation) {
        return res.status(400).json({ message: 'Missing properties in request body' });
    }

    // create new object based on data from chosen Game Area and Hosting Player
    let gameInstance = {};
    gameInstance.gameLocation = Object.assign(req.body.gameLocation);
    gameInstance.battleZones = [];
    gameInstance.players = Array(req.body.hostingPlayer);
    gameInstance.gameState = 'ready';
    gameInstance.id = gameInstance.key + Date.now().toString();
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
                assaultLadder: new Array(10).fill(null),
            })
        }
    })

    // create a folder and new file for the game instance
    const gameInstancesFolderPath = path.join(__dirname, '../game-instances');
    if (!fs.existsSync(gameInstancesFolderPath)) {
        fs.mkdirSync(gameInstancesFolderPath);
    }
    const gameInstanceFilePath = path.join(gameInstancesFolderPath, `${gameInstance.id}.js`);
    const gameInstanceFileContent = `
        module.exports = ${JSON.stringify(gameInstance)};
    `;
    fs.writeFileSync(gameInstanceFilePath, gameInstanceFileContent);

    return res.status(200).json({ id: gameInstance.id });
}