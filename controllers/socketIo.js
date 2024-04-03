const { Server } = require("socket.io");
const errorControllerFileNotFound = 'Method from controller file not found';
function initializeSocket(server) {
    const io = new Server(
        server, { cors: { origin: "http://localhost:3000" } });

    io.on('connection', (socket) => {
        socket.on('joinGame', (payload) => {
            socket.join(payload.gameId);
            console.log('User joined room', payload.gameId);

            const joinNewPlayer = getMethodFromControllerFile('joinNewPlayer', payload.gameId);
            if (!joinNewPlayer) {
                console.error(errorControllerFileNotFound);
                return;
            }

            const gameWithNewPlayer = joinNewPlayer(payload.player);
            io.to(payload.gameId).emit('newPlayerJoined', gameWithNewPlayer)
        });

        socket.on('leaveGame', (payload, callback) => {
            console.log('User removed from room');

            const removePlayer = getMethodFromControllerFile('removePlayer', payload.gameId);
            if (!removePlayer) {
                console.error(errorControllerFileNotFound);
                return;
            }

            const gameWithoutPlayer = removePlayer(payload.player);
            io.to(payload.gameId).emit('playerLeftGame', gameWithoutPlayer)
            socket.leave(payload.gameId);

            callback(); // This will trigger the resolve in the client's promise
        });

        socket.on('playerRelocated', (payload) => {
            console.log('Player relocated');

            const relocatePlayer = getMethodFromControllerFile('relocatePlayer', payload.gameId);
            if (!relocatePlayer) {
                console.error(errorControllerFileNotFound);
                return;
            }

            const gameWithRelocatedPlayers = relocatePlayer(payload.player);
            io.to(payload.gameId).emit('gameUpdated', gameWithRelocatedPlayers)
        });
    });

    // Store io instance in server.io
    server.io = io;
}

function getMethodFromControllerFile(methodName, gameId) {
    const controllerFile = `../game-instances/${gameId}.ts`;
    if (!controllerFile) {
        console.error('Controller file not found');
        return;
    }
    return require(controllerFile)[methodName];
}

module.exports = initializeSocket;