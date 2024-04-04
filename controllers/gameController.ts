const {LADDER_POSITIONS} = require("../constants/projectConstants");
import {Request ,Response} from "express";
import type {GameInstance} from "../constants/customTypes";
let gameInstance: GameInstance = {
    id: '',
    gameState: 'ready',
    gameLocation: {
        locationName: '',
        key: '',
        polygons: [],
    },
    battleZones: [],
    players: [],
};

exports.createNewGameInstance = async (req: Request, res: Response) => {
    if (!gameInstance.id) {
        if (!req.body.gameLocation) {
            return res.status(400).json({ message: 'Missing properties in request body' });
        }

        // create new object based on data from chosen Game Area and Hosting Player
        gameInstance.id = Date.now().toString();
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

        return res.status(201).json({ gameInstance, statusCode: 201 });
    } else {
        return res.status(200).json({ message: 'Game instance already exists', statusCode: 200 });
    }
}