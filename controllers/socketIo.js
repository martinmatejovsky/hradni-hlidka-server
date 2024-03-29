const { Server } = require("socket.io");

function initializeSocket(server) {
    const io = new Server(
        server, { cors: { origin: "http://localhost:3000" } });

    io.on('connection', (socket) => {
        socket.on('joinGame', (payload) => {
            socket.join(payload.gameId);
            console.log('User joined room', payload.gameId);
            const controllerFile = `./testGameController-${payload.gameId}.ts`;

            const {joinNewPlayer} = require(controllerFile);
            const gameWithNewPlayer = joinNewPlayer(payload.player);
            io.to(payload.gameId).emit('newPlayerJoined', gameWithNewPlayer)
        });

        socket.on('leaveGame', (payload, callback) => {
            console.log('User removed from room');
            const controllerFile = `./testGameController-${payload.gameId}.ts`;
            const {removePlayer} = require(controllerFile);

            const gameWithoutPlayer = removePlayer(payload.player);
            io.to(payload.gameId).emit('playerLeftGame', gameWithoutPlayer)
            socket.leave(payload.gameId);

            callback(); // This will trigger the resolve in the client's promise
        });
    });

    // Store io instance in server.io
    server.io = io;
}

module.exports = initializeSocket;