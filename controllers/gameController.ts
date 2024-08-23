import {updateGuardians} from "../utils/updateGuardians";

import {Request ,Response} from "express";
import type {GameInstance, GameState, PlayerData, Settings, Stats} from "../constants/customTypes";
import {Server} from "socket.io";
import {calculateLadderSteps} from "../utils/calculateLadderSteps";
import {runAttack} from "../utils/runAttack";
import {GAME_UPDATE_INTERVAL, EMPTY_GAME_INSTANCE} from "../constants/projectConstants";
let gameInstance: GameInstance = Object.assign({}, EMPTY_GAME_INSTANCE)
let settings: Settings = {
    gameTempo: 0,
    ladderLength: 0,
    assaultWaveVolume: 0,
    assemblyCountdown: 0,
    wavesMinDelay: 0,
    defendersHitStrength: 0,
}
let stats: Stats = {
    incrementingInvaderId: 1
}

let gameUpdateIntervalId: NodeJS.Timeout | null = null;
let gameCalculationIntervalId: NodeJS.Timeout | null = null;

exports.createNewGameInstance = async (req: Request, res: Response) => {
    if (!gameInstance.id) {
        if (![req.body.gameLocation, req.body.settings].every(Boolean)) {
            return res.status(400).json({ message: 'Missing properties in request body' });
        }

        // create new object based on data from chosen Game Area and Hosting Player
        gameInstance.id = Date.now().toString();
        gameInstance.gameState = 'ready';
        gameInstance.gameLocation = Object.assign(req.body.gameLocation);
        gameInstance.battleZones = [];
        gameInstance.players = [];
        gameInstance.gameTempo = req.body.settings.gameTempo;
        gameInstance.ladderLength = req.body.settings.ladderLength;
        let polygonsInGameArea = gameInstance.gameLocation.polygons
        Object.assign(settings, req.body.settings);
        stats.incrementingInvaderId = 1;

        polygonsInGameArea.forEach((polygon) => {
            if (polygon.polygonType === 'battleZone') {
                gameInstance.battleZones.push({
                    zoneName: polygon.polygonName,
                    key: polygon.key,
                    cornerCoordinates: polygon.cornerCoordinates,
                    conquered: false,
                    guardians: [],
                    invaders: [],
                    assembledInvaders: [],
                    assemblyArea: polygon.assemblyArea,
                    assemblyCountdown: 0,
                    assaultLadder: {
                        location: polygon.assaultLadder.location,
                        steps: calculateLadderSteps(polygon.assaultLadder, gameInstance.ladderLength),
                    },
                    waveCooldown: 0,
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

exports.getGameSettings = (req: Request, res: Response) => {
    return res.json(settings);
}

exports.joinNewPlayer = (player: PlayerData): GameInstance => {
    gameInstance.players.push(player);
    updateGuardians(player, gameInstance.battleZones);

    return gameInstance;
}

exports.startGame = (req: Request, res: Response) => {
    const io = req.app.get('io')
    const gameId = req.body.gameId;

    gameInstance.gameState = 'running' as GameState;

    io.to(gameId).emit('gameStarted', gameInstance);
    updateGame(gameId, io);
    return res.status(200).json({ message: 'Game started', statusCode: 200 });
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
    const playerToUpdate = gameInstance.players.find(p => p.key === player.key);
    if (playerToUpdate) {
        playerToUpdate.location = player.location;
        playerToUpdate.insideZone = player.insideZone;
    }

    updateGuardians(player, gameInstance.battleZones);

    return gameInstance;
}

function clearIntervals() {
    if (gameUpdateIntervalId !== null && gameCalculationIntervalId !== null) {
        clearInterval(gameUpdateIntervalId);
        clearInterval(gameCalculationIntervalId);
    }
}

function updateGame(gameId: string, io: Server) {
    clearIntervals();

    // calculate game data on server in regular intervals (gameTempo). Interval is chosen by players to adjust
    // how fast the game goes.
    // Update to players only if they won.
    gameCalculationIntervalId = setInterval(() => {
        runAttack(gameInstance, settings, stats);

        // Check winning/losing condition
        if (gameInstance.gameState === 'won' || gameInstance.gameState === 'lost') {
            clearInterval(gameUpdateIntervalId!);
            clearInterval(gameCalculationIntervalId!);
            io.to(gameId).emit('gameUpdated', gameInstance);
            gameInstance.gameState = 'ready';
            return;
        }
    }, gameInstance.gameTempo);

    // in regular intervals (GAME_UPDATE_INTERVAL) send game data to players. This interval is server constant. It should
    // be a compromise between keeping players reasonably actual and do not bombard them with huge amount of data.
    // Each player has copy of calculating methods to do own calculation in between these GAME_UPDATE_INTERVALs.
    gameUpdateIntervalId = setInterval(() => {
        io.to(gameId).emit('gameUpdated', gameInstance);
    }, GAME_UPDATE_INTERVAL);
}
