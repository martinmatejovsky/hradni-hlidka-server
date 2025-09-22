import { updateGuardians } from '../utils/updateGuardians';

import { Request, Response } from 'express';
import {
    GameInstance,
    GameState,
    PlayerData,
    Settings,
    Stats,
    WeaponType,
    PolygonsMatchingPlayers,
} from '../constants/customTypes';
import { Perks } from '../constants/customTypes.js'; // to enable enum to be defined at runtime it must be imported without "type" prefix
import { Server } from 'socket.io';
import { calculateLadderSteps } from '../utils/calculateLadderSteps';
import { runAttack } from '../utils/runAttack';
import { GAME_UPDATE_INTERVAL, EMPTY_GAME_INSTANCE } from '../constants/projectConstants';
import { LastWaveNotice, GameRuntime } from '../constants/customTypes';
import { pickUpBoilingOil } from '../utils/handleBoilingOil.js';
import { generatePointsAroundCenter } from '../utils/GeneratePointsAroundCenter.js';

export const gameInstances: Record<string, GameInstance> = {};
const gameRuntimes: Record<string, GameRuntime> = {};

let settings: Settings = {
    gameTempo: 0,
    gameLength: 0,
    ladderLength: 0,
    assaultWaveVolume: 0,
    assemblyCountdown: 0,
    wavesMinDelay: 0,
    weaponsStrength: {
        sword: 0,
        cannon: 0,
        axe: 0,
        spear: 0,
    },
    spearHitDepth: 0,
    smithyUpgradeWaiting: 0,
    smithyUpgradeStrength: 0,
    fragsToUpgradeSword: 0,
    perkSharpSwordBonus: 0,
    oilBoilingTime: 0,
    cannonLoadingTime: 0,
};
let stats: Stats = {
    incrementingInvaderId: 1,
    incrementingWaveId: 1,
    axesInGame: 0,
};

const areasToAmountOfPlayers = (polygonsByPlayersTotal: PolygonsMatchingPlayers[], playersTotal: number): string[] => {
    const match = polygonsByPlayersTotal.find((p) => {
        return playersTotal <= p.upTo;
    });
    return match ? match.locations : [];
};

const createNewGameInstance = async (req: Request, res: Response) => {
    if (![req.body.gameLocation, req.body.settings].every(Boolean)) {
        return res.status(400).json({ message: 'Missing properties in request body' });
    }

    const gameId = Date.now().toString();

    // create a new object based on data from chosen Game Area and Hosting Player
    const newInstance: GameInstance = {
        ...EMPTY_GAME_INSTANCE,
        id: gameId,
        sessionName: `${req.body.gameLocation.sessionNamePrefix} - ${gameId.slice(-4)}`,
        gameState: GameState.Ready,
        gameLocation: { ...req.body.gameLocation },
        battleZones: [],
        utilityZones: [],
        players: [],
        gameTempo: req.body.settings.gameTempo,
        ladderLength: req.body.settings.ladderLength,
        carriedOilPots: [],
        gameUpdateIntervalId: null,
        gameCalculationIntervalId: null,
    };

    Object.assign(settings, req.body.settings);
    stats.incrementingInvaderId = 1;
    stats.incrementingWaveId = 1;

    gameInstances[gameId] = newInstance;

    return res.status(201).json({ gameInstance: newInstance, statusCode: 201 });
};

const getGameInstance = (req: Request, res: Response) => {
    const { gameId } = req.query;
    const game = gameInstances[gameId as string];
    if (!game) {
        return res.status(404).json({ message: 'Game with this ID not found' });
    }
    return res.status(200).json(game);
};

const getRunningGames = (req: Request, res: Response) => {
    const gameIds = Object.keys(gameInstances);
    const gameNames = gameIds.map((id) => {
        return { id: id, name: gameInstances[id].sessionName };
    });

    return res.status(200).json(gameNames);
};

const getGameSettings = (req: Request, res: Response) => {
    return res.json(settings);
};

const joinNewPlayer = (player: PlayerData, gameId: string): GameInstance => {
    gameInstances[gameId].players.push(player);
    updateGuardians(player, gameInstances[gameId]);

    return gameInstances[gameId];
};

const startGame = (req: Request, res: Response) => {
    const io = req.app.get('io');
    const gameId = req.body.gameId;
    const gameInstance = gameInstances[gameId];

    const allowedPolygons = areasToAmountOfPlayers(
        gameInstance.gameLocation.polygonsToPlayersTotal,
        gameInstance.players.length,
    );

    let polygonsInGameArea = gameInstance.gameLocation.polygons.filter((polygon) => {
        return allowedPolygons.includes(polygon.key);
    });

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
                assemblyAreaCenter: polygon.assemblyAreaCenter!,
                assemblyArea: polygon.assemblyArea ?? generatePointsAroundCenter(polygon.assemblyAreaCenter!), // can be set manually for specific places, but generally is calculated by randomizer
                assemblyCountdown: 0,
                assaultLadder: {
                    location: polygon.assaultLadder!.location!,
                    steps: calculateLadderSteps(polygon.assaultLadder!, gameInstance.ladderLength),
                },
                waveCooldown: 0,
            });
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
                    readyAt: settings.oilBoilingTime,
                    location: polygon.boilingOilPotLocation,
                },
            });
        }
    });

    gameInstance.gameState = GameState.Running;

    io.to(gameId).emit('gameStarted', gameInstance);

    updateGame(gameId, io);
    return res.status(200).json({ message: 'Game started', statusCode: 200 });
};

const removePlayer = (player: PlayerData, gameId: string): GameInstance => {
    let gameInstance = gameInstances[gameId];

    updateGuardians(player, gameInstance);
    gameInstance.players = gameInstance.players.filter((item) => item.key !== player.key);

    return gameInstance;
};

const checkGameStatus = async (req: Request, res: Response) => {
    const gameStatus = gameInstances[req.body.gameId].gameState;
    return res.status(200).json({ gameStatus });
};

const relocatePlayer = (player: PlayerData, gameId: string): GameInstance => {
    updateGuardians(player, gameInstances[gameId]);

    return gameInstances[gameId];
};

const upgradeGuardian = (player: PlayerData, perk: Perks, perkValue: number | string, gameId: string): GameInstance => {
    const gameInstance = gameInstances[gameId];
    const playerToUpdate = gameInstance.players.find((p) => p.key === player.key);
    if (!playerToUpdate) {
        return gameInstance;
    }

    if (perk === Perks.boilingOil) {
        pickUpBoilingOil(gameInstance, playerToUpdate, perkValue);
    } else {
        playerToUpdate.perks[perk] = perkValue;
    }

    return gameInstance;
};

const dropUnsupportedOilPot = (player: PlayerData, gameId: string): GameInstance => {
    const gameInstance = gameInstances[gameId];
    const potCarriedByPlayer = gameInstance.carriedOilPots.find((pot) => pot.carriedBy.includes(player.key));

    if (potCarriedByPlayer?.carriedBy.length === 1) {
        gameInstance.carriedOilPots.splice(gameInstance.carriedOilPots.indexOf(potCarriedByPlayer), 1);
        gameInstance.players.find((p) => p.key === player.key)!.perks.boilingOil = false;
    }

    return gameInstance;
};

function clearIntervals(gameId: string) {
    const runtime = gameRuntimes[gameId];

    if (runtime?.gameUpdateIntervalId) clearInterval(runtime.gameUpdateIntervalId);
    if (runtime?.gameCalculationIntervalId) clearInterval(runtime.gameCalculationIntervalId);
}

function updateGame(gameId: string, io: Server) {
    const gameInstance = gameInstances[gameId];
    if (!gameRuntimes[gameId]) {
        gameRuntimes[gameId] = {
            gameUpdateIntervalId: null,
            gameCalculationIntervalId: null,
        };
    }

    const runtime = gameRuntimes[gameId];

    stats.axesInGame = gameInstance.players.filter((p) => p.weaponType === WeaponType.AXE).length;

    // calculate game data on server in regular intervals (gameTempo). Interval is chosen by players to adjust
    // how fast the game goes.
    runtime.gameCalculationIntervalId = setInterval(() => {
        runAttack(gameInstance, settings, stats);

        // announce approaching last waves
        if (stats.incrementingWaveId === settings.gameLength - 2) {
            const event: LastWaveNotice = 'incoming';
            io.to(gameId).emit('lastWaveNotice', event);
        } else if (stats.incrementingWaveId === settings.gameLength) {
            const event: LastWaveNotice = 'running';
            io.to(gameId).emit('lastWaveNotice', event);
        }

        // Check winning/losing condition
        if (gameInstance.gameState === GameState.Won || gameInstance.gameState === GameState.Lost) {
            clearIntervals(gameId);
            io.to(gameId).emit('gameUpdated', gameInstance);
            return;
        }
    }, gameInstance.gameTempo);

    // in regular intervals (GAME_UPDATE_INTERVAL) send game data to players. This interval is server constant. It should
    // be a compromise between keeping players reasonably actual and do not bombard them with huge amount of data.
    // Each player has copy of calculating methods to do own calculation in between these GAME_UPDATE_INTERVALs.
    runtime.gameUpdateIntervalId = setInterval(() => {
        io.to(gameId).emit('gameUpdated', gameInstance);
    }, GAME_UPDATE_INTERVAL);
}

const findPlayerBySocketId = (socketId: string, gameId: string): PlayerData | undefined => {
    return gameInstances[gameId].players.find((p) => p.socketId === socketId);
};

export default {
    gameInstances,
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
    getRunningGames,
    clearIntervals,
};
