import {updateGuardians} from "../utils/updateGuardians";

const {LADDER_POSITIONS} = require("../constants/projectConstants");
import {Request ,Response} from "express";
import type {GameInstance, GameState, PlayerData} from "../constants/customTypes";
import {Server} from "socket.io";
import {assembleInvaders} from "../utils/assembleInvaders";
import {runAttack} from "../utils/runAttack";
import {GAME_TEMPO, GAME_UPDATE_INTERVAL, EMPTY_GAME_INSTANCE} from "../constants/projectConstants";
let gameInstance: GameInstance = Object.assign({}, EMPTY_GAME_INSTANCE)

let gameUpdateIntervalId: NodeJS.Timeout | null = null;
let gameCalculationId: NodeJS.Timeout | null = null;

exports.createNewGameInstance = async (req: Request, res: Response) => {
    if (!gameInstance.id) {
        if (!req.body.gameLocation) {
            return res.status(400).json({ message: 'Missing properties in request body' });
        }

        // create new object based on data from chosen Game Area and Hosting Player
        gameInstance.id = Date.now().toString();
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

        return res.status(201).json({ gameInstance, statusCode: 201 });
    } else {
        return res.status(200).json({ message: 'Game instance already exists', statusCode: 200 });
    }
}

exports.getGameInstance = (req: Request, res: Response) => {
    return res.json(gameInstance);
}

exports.joinNewPlayer = (player: PlayerData): GameInstance => {
    gameInstance.players.push(player);
    updateGuardians(player, gameInstance.battleZones);

    return gameInstance;
}

exports.startGame = (req: Request, io: Server): void => {
    const gameId = req.body.gameId;

    gameInstance.gameState = 'running' as GameState;
    gameInstance.battleZones = assembleInvaders(gameInstance.battleZones);

    io.to(gameId).emit('gameStarted', gameInstance);
    updateGame(gameId, io);
}

exports.removePlayer = (player: PlayerData): GameInstance => {
    updateGuardians(player, gameInstance.battleZones);
    gameInstance.players = gameInstance.players.filter((item) => item.key !== player.key);

    if (gameInstance.players.length === 0) {
        clearIntervals();

        // TODO: in real app it should delete whole javascript file, not just reset state
        gameInstance = Object.assign({}, EMPTY_GAME_INSTANCE);
    }
    return gameInstance;
}

exports.checkGameStatus = async (req: Request, res: Response) => {
    const gameStatus = gameInstance.gameState;
    return res.status(200).json({ gameStatus });
}

exports.relocatePlayer = (player: PlayerData): GameInstance => {
    updateGuardians(player, gameInstance.battleZones);

    return gameInstance;
}

function clearIntervals() {
    if (gameUpdateIntervalId !== null && gameCalculationId !== null) {
        clearInterval(gameUpdateIntervalId);
        clearInterval(gameCalculationId);
    }
}

function updateGame(gameId: string, io: Server) {
    clearIntervals();

    gameCalculationId = setInterval(() => {
        runAttack(gameInstance);

        // Check winning/losing condition
        if (gameInstance.gameState === 'won' || gameInstance.gameState === 'lost') {
            clearInterval(gameUpdateIntervalId!);
            clearInterval(gameCalculationId!);
            io.to(gameId).emit('gameUpdated', gameInstance);
            gameInstance.gameState = 'ready';
            return;
        }
    }, GAME_TEMPO);

    gameUpdateIntervalId = setInterval(() => {
        io.to(gameId).emit('gameUpdated', gameInstance);
    }, GAME_UPDATE_INTERVAL);
}