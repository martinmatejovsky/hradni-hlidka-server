import {updateGuardians} from "../utils/updateGuardians";

import {Request ,Response} from "express";
import type {GameInstance, GameState, PlayerData, Settings, Stats} from "../constants/customTypes";
import {Perks} from "../constants/customTypes.js" // to enable enum to be defined at runtime it must be imported without "type" prefix
import {Server} from "socket.io";
import {calculateLadderSteps} from "../utils/calculateLadderSteps";
import {runAttack} from "../utils/runAttack";
import {GAME_UPDATE_INTERVAL, EMPTY_GAME_INSTANCE} from "../constants/projectConstants";
import {LastWaveNotice} from "../constants/customTypes";
import {pickUpBoilingOil} from "../utils/handleBoilingOil.js";
export let gameInstance: GameInstance = Object.assign({}, EMPTY_GAME_INSTANCE)

let settings: Settings = {
    gameTempo: 0,
    gameLength: 0,
    ladderLength: 0,
    assaultWaveVolume: 0,
    assemblyCountdown: 0,
    wavesMinDelay: 0,
    defendersHitStrength: 0,
    smithyUpgradeWaiting: 0,
    smithyUpgradeStrength: 0,
    oilBoilingTime: 0,
    cannonLoadingTime: 0,
}
let stats: Stats = {
    incrementingInvaderId: 1,
    incrementingWaveId: 1,
}

let gameUpdateIntervalId: NodeJS.Timeout | null = null;
let gameCalculationIntervalId: NodeJS.Timeout | null = null;

const createNewGameInstance = async (req: Request, res: Response) => {
    if (!gameInstance.id) {
        if (![req.body.gameLocation, req.body.settings].every(Boolean)) {
            return res.status(400).json({ message: 'Missing properties in request body' });
        }

        // create a new object based on data from chosen Game Area and Hosting Player
        gameInstance.id = Date.now().toString();
        gameInstance.gameState = 'ready';
        gameInstance.gameLocation = Object.assign(req.body.gameLocation);
        gameInstance.battleZones = [];
        gameInstance.utilityZones = [];
        gameInstance.players = [];
        gameInstance.gameTempo = req.body.settings.gameTempo;
        gameInstance.ladderLength = req.body.settings.ladderLength;
        gameInstance.carriedOilPots = []
        let polygonsInGameArea = gameInstance.gameLocation.polygons
        Object.assign(settings, req.body.settings);
        stats.incrementingInvaderId = 1;
        stats.incrementingWaveId = 1;

        polygonsInGameArea.forEach((polygon) => {
            if (polygon.polygonType === 'assaultZone') {
                gameInstance.battleZones.push({
                    zoneName: polygon.polygonName,
                    key: polygon.key,
                    polygonType: polygon.polygonType,
                    areaOfAcceptedPresence: polygon.areaOfAcceptedPresence,
                    areaPresentational: polygon.areaPresentational,
                    conquered: false,
                    guardians: [],
                    invaders: [],
                    assemblyArea: polygon.assemblyArea!,
                    assemblyAreaCenter: polygon.assemblyAreaCenter!,
                    assemblyCountdown: 0,
                    assaultLadder: {
                        location: polygon.assaultLadder!.location!,
                        steps: calculateLadderSteps(polygon.assaultLadder!, gameInstance.ladderLength),
                    },
                    waveCooldown: 0,
                })
            }

            if (polygon.polygonType === 'smithy') {
                gameInstance.utilityZones.push({
                    zoneName: polygon.polygonName,
                    key: polygon.key,
                    polygonType: polygon.polygonType,
                    areaOfAcceptedPresence: polygon.areaOfAcceptedPresence,
                    areaPresentational: polygon.areaPresentational,
                    guardians: [],
                    boilingOil: {
                        readiness: 0,
                        readyAt: req.body.settings.oilBoilingTime,
                        location: polygon.boilingOilPotLocation,
                    },
                })
            }
        });

        return res.status(201).json({ gameInstance, statusCode: 201 });
    } else {
        return res.status(200).json({ message: 'Game instance already exists', statusCode: 200 });
    }
}

const getGameInstance = (req: Request, res: Response) => {
    return res.json(gameInstance);
}

const getGameSettings = (req: Request, res: Response) => {
    return res.json(settings);
}

const joinNewPlayer = (player: PlayerData): GameInstance => {
    gameInstance.players.push(player);
    updateGuardians(player, gameInstance);

    return gameInstance;
}

const startGame = (req: Request, res: Response) => {
    const io = req.app.get('io')
    const gameId = req.body.gameId;

    gameInstance.gameState = 'running' as GameState;

    io.to(gameId).emit('gameStarted', gameInstance);
    updateGame(gameId, io);
    return res.status(200).json({ message: 'Game started', statusCode: 200 });
}

const removePlayer = (player: PlayerData): GameInstance => {
    updateGuardians(player, gameInstance);
    gameInstance.players = gameInstance.players.filter((item) => item.key !== player.key);

    if (gameInstance.players.length === 0) {
        clearIntervals();

        // TODO: in real app with multiple battles running it should delete whole game differently
        gameInstance = Object.assign({}, EMPTY_GAME_INSTANCE);
    }
    return gameInstance;
}

const checkGameStatus = async (req: Request, res: Response) => {
    const gameStatus = gameInstance.gameState;
    return res.status(200).json({ gameStatus });
}

const relocatePlayer = (player: PlayerData): GameInstance => {
    updateGuardians(player, gameInstance);

    return gameInstance;
}

const upgradeGuardian = (player: PlayerData, perk: Perks, perkValue: number | string): GameInstance => {
    const playerToUpdate = gameInstance.players.find(p => p.key === player.key);
    if (! playerToUpdate) {
        return gameInstance;
    }

    if (perk === Perks.boilingOil) {
        pickUpBoilingOil(gameInstance, playerToUpdate, perkValue)
    } else {
        playerToUpdate.perks[perk] = perkValue;
    }

    return gameInstance;
}

const dropUnsupportedOilPot = (player: PlayerData): GameInstance => {
    const potCarriedByPlayer = gameInstance.carriedOilPots.find(pot =>
        pot.carriedBy.includes(player.key)
    );

    if (potCarriedByPlayer?.carriedBy.length === 1) {
        gameInstance.carriedOilPots.splice(gameInstance.carriedOilPots.indexOf(potCarriedByPlayer), 1);
        gameInstance.players.find(p => p.key === player.key)!.perks.boilingOil = false;
    }

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
    gameCalculationIntervalId = setInterval(() => {
        runAttack(gameInstance, settings, stats);

        // announce approaching last waves
        if (stats.incrementingWaveId === settings.gameLength - 2) {
            const event: LastWaveNotice = "incoming"
            io.to(gameId).emit('lastWaveNotice', event);

        } else if (stats.incrementingWaveId === settings.gameLength) {
            const event: LastWaveNotice = "running"
            io.to(gameId).emit('lastWaveNotice', event);

        }

        // Check winning/losing condition
        if (gameInstance.gameState === 'won' || gameInstance.gameState === 'lost') {
            clearInterval(gameUpdateIntervalId!);
            clearInterval(gameCalculationIntervalId!);
            io.to(gameId).emit('gameUpdated', gameInstance);
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

const findPlayerBySocketId = (socketId: string): PlayerData | undefined => {
    return gameInstance.players.find(p => p.socketId === socketId);
}

export default {
    gameInstance,
    createNewGameInstance,
    getGameInstance,
    getGameSettings,
    joinNewPlayer,
    startGame,
    removePlayer,
    checkGameStatus,
    relocatePlayer,
    upgradeGuardian,
    dropUnsupportedOilPot,
    findPlayerBySocketId,
}