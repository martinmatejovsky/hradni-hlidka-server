import {Server} from "socket.io";
import gameController from './gameController';
import weaponsController from "./weaponsController.js";
import {cannonBallSpeed} from "../constants/projectConstants.js";

function initializeSocket(server: any) {
    const io = new Server(
        server, { cors: { origin: "http://localhost:3000" } });

    io.on('connection', (socket) => {
        socket.on('joinGame', (payload) => {
            socket.join(payload.gameId);

            const playerWithSocketId = { ...payload.player, socketId: socket.id };
            const gameWithNewPlayer = gameController.joinNewPlayer(playerWithSocketId);
            io.to(payload.gameId).emit('newPlayerJoined', gameWithNewPlayer)
        });

        socket.on('leaveGame', (payload, callback) => {
            const gameWithoutPlayer = gameController.removePlayer(payload.player);
            socket.leave(payload.gameId);
            io.to(payload.gameId).emit('playerLeftGame', gameWithoutPlayer)

            callback(); // This will trigger the resolve in the client's promise
        });

        socket.on('playerRelocatedToZone', (payload) => {
            const gameWithRelocatedPlayers = gameController.relocatePlayer(payload.player);

            io.to(payload.gameId).emit('gameUpdated', gameWithRelocatedPlayers)
        });

        socket.on('smithyUpgradeAchieved', (payload) => {
            const gameWithUpgradedPlayers = gameController.upgradeGuardian(payload.player, payload.perk, payload.perkValue);

            io.to(payload.gameId).emit('gameUpdated', gameWithUpgradedPlayers)
        })

        socket.on('dropUnsupportedOilPot', (payload) => {
            const gameWithDroppedPot = gameController.dropUnsupportedOilPot(payload.player);
            io.emit('gameUpdated', gameWithDroppedPot);
        })

        socket.on('oilIsPouredOff', (payload) => {
            const gameWithUpdatedOilPots = weaponsController.setPouredOffOilPots(payload.player, io);
            io.emit('gameUpdated', gameWithUpdatedOilPots);
        })

        socket.on('fireCannon', (payload) => {
            // emit event to all players, that cannonball is fired, so each player can show the cannonball flight animation
            io.emit('cannonIsFired', payload.targetZoneKey, payload.firedBy);

            // set timeout, because cannonball is traveling
            setTimeout(() => {
                const gameWithUpdatedAfterFiring =
                    weaponsController.fireCannon(payload.targetZoneKey);
                    io.emit('gameUpdated', gameWithUpdatedAfterFiring);
              }, cannonBallSpeed);
        })

        socket.on('disconnect', () => {
            const disconnectedPlayer = gameController.findPlayerBySocketId(socket.id);
            if (disconnectedPlayer) {
                gameController.removePlayer(disconnectedPlayer);
            }
        });
    });

    // Store io instance in server.io, that is then accessible for other scripts
    server.io = io;
}

export default initializeSocket;
