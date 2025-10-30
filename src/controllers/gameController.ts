import { updateGuardians } from '../utils/updateGuardians';

import { Request, Response } from 'express';
import { PlayerData, Stats, GameState } from '../constants/customTypes';
import { Perks } from '../constants/customTypes.js'; // to enable enum to be defined at runtime it must be imported without "type" prefix
import { pickUpBoilingOil } from '../utils/handleBoilingOil.js';
import { GameSession } from '../utils/gameSessionClass.js';

export const gameSessions: Record<string, GameSession> = {};

let stats: Stats = {
    incrementingInvaderId: 1,
    incrementingWaveId: 1,
    axesInGame: 0,
};

function createGame(req: Request, res: Response) {
    const id = Date.now().toString();
    const sessionName = `${req.body.gameLocation.sessionNamePrefix} - ${id.slice(-3)}`;
    const session = new GameSession(id, sessionName, req.body.gameLocation, req.body.settings);

    gameSessions[id] = session;

    stats.incrementingInvaderId = 1;
    stats.incrementingWaveId = 1;

    res.status(201).json(session.toJSON());
}

function startGame(req: Request) {
    const io = req.app.get('io');
    const gameId = req.body.gameId;

    const session = gameSessions[gameId];
    if (session) {
        session.start(io, stats);
    }
}

const getGameInstance = (req: Request, res: Response) => {
    const { gameId } = req.query;
    const session = gameSessions[gameId as string];

    if (!gameId || typeof gameId !== 'string') {
        return res.status(400).json({ message: 'Missing or invalid gameId' });
    }

    if (!session) {
        return res.status(404).json({ message: 'Game with this ID not found' });
    }
    return res.status(200).json(session.toJSON());
};

const getRunningGames = (req: Request, res: Response) => {
    const gameIds = Object.keys(gameSessions);
    const gameNames = gameIds
        .filter((id) => gameSessions[id].gameState === GameState.Ready)
        .map((id) => ({
            id,
            name: gameSessions[id].sessionName,
        }));
    return res.status(200).json(gameNames);
};

const joinNewPlayer = (player: PlayerData, gameId: string): GameSession => {
    gameSessions[gameId].players.push(player);
    updateGuardians(player, gameSessions[gameId]);

    return gameSessions[gameId];
};

const removePlayer = (player: PlayerData, gameId: string): GameSession => {
    const session = gameSessions[gameId];

    updateGuardians(player, session);
    session.players = session.players.filter((item) => item.key !== player.key);

    return session;
};

const checkGameStatus = async (req: Request, res: Response) => {
    const gameStatus = gameSessions[req.body.gameId]?.gameState;

    if (!gameStatus) {
        return res.status(404).json({ message: 'Game with this ID not found' });
    }
    return res.status(200).json({ gameStatus });
};

const relocatePlayer = (player: PlayerData, gameId: string): GameSession => {
    updateGuardians(player, gameSessions[gameId]);

    return gameSessions[gameId];
};

const upgradeGuardian = (player: PlayerData, perk: Perks, perkValue: number | string, gameId: string): GameSession => {
    const session = gameSessions[gameId];
    const playerToUpdate = session.players.find((p) => p.key === player.key);
    if (!playerToUpdate) {
        return session;
    }

    if (perk === Perks.boilingOil) {
        pickUpBoilingOil(session, playerToUpdate, perkValue);
    } else {
        playerToUpdate.perks[perk] = perkValue;
    }

    return session;
};

const dropUnsupportedOilPot = (player: PlayerData, gameId: string): GameSession => {
    const session = gameSessions[gameId];
    const potCarriedByPlayer = session.carriedOilPots.find((pot) => pot.carriedBy.includes(player.key));

    if (potCarriedByPlayer?.carriedBy.length === 1) {
        session.carriedOilPots.splice(session.carriedOilPots.indexOf(potCarriedByPlayer), 1);
        session.players.find((p) => p.key === player.key)!.perks.boilingOil = false;
    }

    return session;
};

const findPlayerBySocketId = (socketId: string, gameId: string): PlayerData | undefined => {
    return gameSessions[gameId].players.find((p) => p.socketId === socketId);
};

export default {
    createGame,
    getGameInstance,
    joinNewPlayer,
    startGame,
    removePlayer,
    checkGameStatus,
    relocatePlayer,
    upgradeGuardian,
    dropUnsupportedOilPot,
    findPlayerBySocketId,
    getRunningGames,
};
