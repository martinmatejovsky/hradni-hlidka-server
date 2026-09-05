import { Server } from 'socket.io';
import gameController from './gameController';
import weaponsController from './weaponsController.js';
import { cannonBallSpeed } from '../constants/projectConstants.js';
import { gameSessions } from './gameController.js';

const disconnectTimers = new Map<string, NodeJS.Timeout>();

function initializeSocket(server: any) {
    const io = new Server(server, {
        cors: { origin: process.env.CORS_ORIGIN },
        connectionStateRecovery: {
            maxDisconnectionDuration: 2 * 60 * 1000,
            skipMiddlewares: true,
        },
        pingInterval: 10000,
        pingTimeout: 15000,
    });

    io.on('connection', (socket) => {
        socket.on('joinGame', (payload) => {
            socket.join(payload.gameId);
            socket.data.gameId = payload.gameId;

            if (payload.player?.key && disconnectTimers.has(payload.player.key)) {
                clearTimeout(disconnectTimers.get(payload.player.key));
                disconnectTimers.delete(payload.player.key);
            }

            const existingPlayer = payload.player?.key
                ? gameController.findPlayerByKey(payload.player.key, payload.gameId)
                : undefined;

            if (existingPlayer) {
                existingPlayer.socketId = socket.id;
                // Re-sync full game state to the reconnected player
                socket.emit('gameUpdated', gameSessions[payload.gameId]);
            } else {
                const playerWithSocketId = { ...payload.player, socketId: socket.id };
                const gameWithNewPlayer = gameController.joinNewPlayer(playerWithSocketId, payload.gameId);
                io.to(payload.gameId).emit('newPlayerJoined', gameWithNewPlayer);
            }
        });

        socket.on('leaveGame', (payload, callback) => {
            if (payload.player?.key && disconnectTimers.has(payload.player.key)) {
                clearTimeout(disconnectTimers.get(payload.player.key));
                disconnectTimers.delete(payload.player.key);
            }

            if (!gameSessions[payload.gameId]) return;

            const gameWithoutPlayer = gameController.removePlayer(payload.player, payload.gameId);
            socket.leave(payload.gameId);

            if (gameWithoutPlayer.players.length === 0) {
                gameWithoutPlayer.stop();
                delete gameSessions[payload.gameId];
            } else {
                io.to(payload.gameId).emit('playerLeftGame', gameWithoutPlayer);
            }

            callback(); // This will trigger the resolve in the client's promise
        });

        socket.on('playerRelocatedToZone', (payload) => {
            const gameWithRelocatedPlayers = gameController.relocatePlayer(payload.player, socket.data.gameId);

            io.to(socket.data.gameId).emit('gameUpdated', gameWithRelocatedPlayers);
        });

        socket.on('smithyUpgradeAchieved', (payload) => {
            const gameWithUpgradedPlayers = gameController.upgradeGuardian(
                payload.player,
                payload.perk,
                payload.perkValue,
                socket.data.gameId,
                payload.perkCost,
            );

            io.to(payload.gameId).emit('gameUpdated', gameWithUpgradedPlayers);
        });

        socket.on('dropUnsupportedOilPot', (payload) => {
            const gameWithDroppedPot = gameController.dropUnsupportedOilPot(payload.player, socket.data.gameId);
            // TODO: this could probably go just to player that dropped oil pot by using socket.emit()
            io.to(socket.data.gameId).emit('gameUpdated', gameWithDroppedPot);
        });

        socket.on('oilIsPouredOff', (payload) => {
            const { gameId } = socket.data;
            const gameWithUpdatedOilPots = weaponsController.setPouredOffOilPots(payload.player, gameId, io);
            io.to(gameId).emit('gameUpdated', gameWithUpdatedOilPots);
        });

        socket.on('fireCannon', (payload) => {
            const { gameId } = socket.data;

            // emit event to all players, that cannonball is fired, so each player can show the cannonball flight animation
            io.to(gameId).emit('cannonIsFired', payload.targetZoneKey, payload.firedBy);

            // set timeout, because cannonball is traveling
            setTimeout(() => {
                const gameWithUpdatedAfterFiring = weaponsController.fireCannon(
                    payload.targetZoneKey,
                    payload.firedBy,
                    gameId,
                );
                io.to(gameId).emit('gameUpdated', gameWithUpdatedAfterFiring);
            }, cannonBallSpeed);
        });

        socket.on('disconnect', () => {
            const { gameId } = socket.data;
            if (!gameId || !gameSessions[gameId]) return;

            const disconnectedPlayer = gameController.findPlayerBySocketId(socket.id, gameId);

            if (disconnectedPlayer) {
                // Clear any existing timer for this player key
                if (disconnectTimers.has(disconnectedPlayer.key)) {
                    clearTimeout(disconnectTimers.get(disconnectedPlayer.key));
                }

                // Set grace period before removing player completely
                const timer = setTimeout(() => {
                    if (!gameSessions[gameId]) {
                        disconnectTimers.delete(disconnectedPlayer.key);
                        return;
                    }

                    // Only remove if the player hasn't reconnected with a new socketId
                    const currentPlayerInSession = gameController.findPlayerByKey(disconnectedPlayer.key, gameId);
                    if (currentPlayerInSession && currentPlayerInSession.socketId === socket.id) {
                        const gameWithoutPlayer = gameController.removePlayer(disconnectedPlayer, gameId);

                        if (gameWithoutPlayer.players.length === 0) {
                            gameWithoutPlayer.stop();
                            delete gameSessions[gameId];
                        } else {
                            io.to(gameId).emit('playerLeftGame', gameWithoutPlayer);
                        }
                    }
                    disconnectTimers.delete(disconnectedPlayer.key);
                }, 45000);

                disconnectTimers.set(disconnectedPlayer.key, timer);
            }
        });

        socket.on('shieldDefenceResult', (payload) => {
            if (!payload.caughtArrows || payload.caughtArrows == 0) return;

            const { gameId } = socket.data;
            const newExperienceValue = weaponsController.awardCaughtArrows(
                payload.playerKey,
                payload.caughtArrows,
                gameId,
            );

            // to single player only
            socket.emit('xpUpdated', {
                experience: newExperienceValue,
            });
        });
    });

    // Store io instance in server.io, that is then accessible for other scripts
    server.io = io;
}

export default initializeSocket;
