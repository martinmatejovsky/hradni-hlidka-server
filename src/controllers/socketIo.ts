import {Server} from "socket.io";
import gameController from './gameController';

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
