import type { GameInstance, PlayerData, GameState } from "../constants/customTypes";
import {Request, Response} from "express";
import { Server } from 'socket.io';
const { mockGameInstance } = require('../mock-data/gameInstance');
const { assembleInvaders } = require("../utils/assembleInvaders");
import {runAttack} from "../utils/runAttack";
let gameInstance: GameInstance = {...mockGameInstance}
import {GAME_UPDATE_INTERVAL, GAME_TEMPO} from '../constants/projectConstants';
let gameUpdateIntervalId: NodeJS.Timeout | null = null;
let gameCalculationId: NodeJS.Timeout | null = null;

module.exports.getGameInstance = (req: Request, res: Response): Response => {
    return res.status(200).json({ ...gameInstance });
}

module.exports.joinNewPlayer = (player: PlayerData): GameInstance => {
    gameInstance.players.push(player);
    return gameInstance;
}

module.exports.removePlayer = (player: PlayerData): GameInstance => {
    gameInstance.players = gameInstance.players.filter((item) => item.key !== player.key);
    if (gameInstance.players.length === 0) {
        if (gameUpdateIntervalId) clearInterval(gameUpdateIntervalId);
        // TODO: in real app it should delete whole javascript file, not just set state "ready"
        gameInstance.gameState = 'ready';
    }
    return gameInstance;
}

module.exports.startGame = (req: Request, io: Server): void => {
    const gameId = req.body.gameId;

    gameInstance.gameState = 'running' as GameState;
    gameInstance.battleZones = assembleInvaders(gameInstance.battleZones);

    io.to(gameId).emit('gameStarted', gameInstance);
    updateGame(gameId, io);
}

function updateGame(gameId: string, io: Server) {
    if (gameUpdateIntervalId !== null && gameCalculationId !== null) {
        clearInterval(gameUpdateIntervalId);
        clearInterval(gameCalculationId);
    }

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