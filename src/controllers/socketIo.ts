import { Server } from 'socket.io';
import gameController from './gameController';
import weaponsController from './weaponsController.js';
import { cannonBallSpeed } from '../constants/projectConstants.js';
import { gameInstances } from './gameController.js';

function initializeSocket(server: any) {
    const io = new Server(server, { cors: { origin: process.env.CORS_ORIGIN || 'http://localhost:3000' } });

    io.on('connection', (socket) => {
        socket.on('joinGame', (payload) => {
            socket.join(payload.gameId);
            socket.data.gameId = payload.gameId;

            const playerWithSocketId = { ...payload.player, socketId: socket.id };
            const gameWithNewPlayer = gameController.joinNewPlayer(playerWithSocketId, payload.gameId);
            io.to(payload.gameId).emit('newPlayerJoined', gameWithNewPlayer);
        });

        socket.on('leaveGame', (payload, callback) => {
            if (!gameInstances[payload.gameId]) return;

            const gameWithoutPlayer = gameController.removePlayer(payload.player, payload.gameId);
            socket.leave(payload.gameId);

            if (gameWithoutPlayer.players.length === 0) {
                gameController.clearIntervals(payload.gameId);
                delete gameInstances[payload.gameId];
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
            );

            io.to(payload.gameId).emit('gameUpdated', gameWithUpgradedPlayers);
        });

        socket.on('dropUnsupportedOilPot', (payload) => {
            const gameWithDroppedPot = gameController.dropUnsupportedOilPot(payload.player, socket.data.gameId);
            io.emit('gameUpdated', gameWithDroppedPot);
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
            if (!gameInstances[socket.data.gameId]) return;

            const disconnectedPlayer = gameController.findPlayerBySocketId(socket.id, socket.data.gameId);
            if (disconnectedPlayer) {
                gameController.removePlayer(disconnectedPlayer, socket.data.gameId);

                if (gameInstances[socket.data.gameId].players.length === 0) {
                    gameController.clearIntervals(socket.data.gameId);
                    delete gameInstances[socket.data.gameId];
                }
            }
        });
    });

    // Store io instance in server.io, that is then accessible for other scripts
    server.io = io;
}

export default initializeSocket;
