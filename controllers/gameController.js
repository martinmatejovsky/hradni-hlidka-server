exports.createNewGameInstance = (req, res) => {
    if (!req.body.gameLocation || !req.body.hostingPlayer) {
        return res.status(400).json({ message: 'Missing properties in request body' });
    }

    // create new object based on data from chosen Game Area and Hosting Player
    let gameInstance = req.body.gameLocation;
    gameInstance.battleZones = [];
    gameInstance.players = Array(req.body.hostingPlayer);
    gameInstance.id = gameInstance.key + Date.now().toString();
    let polygonsInGameArea = gameInstance.polygons

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
    return res.status(200).json({ ...gameInstance });
}