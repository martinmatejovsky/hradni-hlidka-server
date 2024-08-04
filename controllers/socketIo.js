const { Server } = require("socket.io");
const gameController = require('./gameController');

function initializeSocket(server) {
    const io = new Server(
        server, { cors: { origin: "http://localhost:3000" } });

    io.on('connection', (socket) => {
        socket.on('joinGame', (payload) => {
            socket.join(payload.gameId);

            const gameWithNewPlayer = gameController.joinNewPlayer(payload.player);
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
    });

    // Store io instance in server.io
    server.io = io;
}

module.exports = initializeSocket;
