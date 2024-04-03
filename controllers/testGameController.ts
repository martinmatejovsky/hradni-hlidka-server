import type { GameInstance, PlayerData, GameState } from "../constants/customTypes";
import {Request} from "express";
import { Server } from 'socket.io';
import {GAME_UPDATE_INTERVAL, GAME_TEMPO} from '../constants/projectConstants';
import {updateGuardians} from "../utils/updateGuardians";
const { assembleInvaders } = require("../utils/assembleInvaders");
import {runAttack} from "../utils/runAttack";

let gameInstance: GameInstance
let gameUpdateIntervalId: NodeJS.Timeout | null = null;
let gameCalculationId: NodeJS.Timeout | null = null;

module.exports.supplyGameInstance = (gameInstanceData: GameInstance): void => {
    gameInstance = gameInstanceData;
}
module.exports.getGameInstance = () => {
    return gameInstance;
}

module.exports.joinNewPlayer = (player: PlayerData): GameInstance => {
    gameInstance.players.push(player);
    updateGuardians(player, gameInstance.battleZones);

    return gameInstance;
}

module.exports.removePlayer = (player: PlayerData): GameInstance => {
    updateGuardians(player, gameInstance.battleZones);
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

module.exports.relocatePlayer = (player: PlayerData): GameInstance => {
    updateGuardians(player, gameInstance.battleZones);

    return gameInstance;
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