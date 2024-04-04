const { Server } = require("socket.io");
const gameController = require('./gameController');

function initializeSocket(server) {
    const io = new Server(
        server, { cors: { origin: "http://localhost:3000" } });

    io.on('connection', (socket) => {
        socket.on('joinGame', (payload) => {
            socket.join(payload.gameId);
            console.log('User joined room', payload.gameId);

            const gameWithNewPlayer = gameController.joinNewPlayer(payload.player);
            io.to(payload.gameId).emit('newPlayerJoined', gameWithNewPlayer)
        });

        socket.on('leaveGame', (payload, callback) => {
            console.log('User removed from room');

            const gameWithoutPlayer = gameController.removePlayer(payload.player);
            io.to(payload.gameId).emit('playerLeftGame', gameWithoutPlayer)
            socket.leave(payload.gameId);

            callback(); // This will trigger the resolve in the client's promise
        });

        socket.on('playerRelocated', (payload) => {
            console.log('Player relocated');

            const gameWithRelocatedPlayers = gameController.relocatePlayer(payload.player);
            io.to(payload.gameId).emit('gameUpdated', gameWithRelocatedPlayers)
        });
    });

    // Store io instance in server.io
    server.io = io;
}

module.exports = initializeSocket;