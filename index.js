const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app); // Create an HTTP server using Express
const io = new Server(
    server, { cors: { origin: "http://localhost:3000" } });
const cors = require('cors');
const path = require("path");
const port = 4000;
const gameLocationsRouter = require('./routes/game-locations');
const gameRouter = require('./routes/game');
const frontendPath = process.env.FRONTEND_PATH || "../hradni-hlidka/dist";

// Middleware
app.use(express.static(path.join(__dirname, frontendPath)));
app.use(cors());
app.use(express.json());
app.use('/api/game-locations', gameLocationsRouter);
app.use('/api/game', gameRouter);

// SOCKET
io.on('connection', (socket) => {
    socket.on('joinGame', (payload) => {
        socket.join(payload.gameId);
        console.log('User joined room', payload.gameId);
        const controllerFile = `./controllers/testGameController-${payload.gameId}.js`;

        const { joinNewPlayer } = require(controllerFile);
        const gameWithNewPlayer = joinNewPlayer(payload.player);
        io.to(payload.gameId).emit('newPlayerJoined', gameWithNewPlayer)
    });

    socket.on('leaveGame', (payload, callback) => {
        console.log('User removed from room');
        const controllerFile = `./controllers/testGameController-${payload.gameId}.js`;
        const { removePlayer } = require(controllerFile);

        const gameWithoutPlayer = removePlayer(payload.player);
        io.to(payload.gameId).emit('playerLeftGame', gameWithoutPlayer)
        socket.leave(payload.gameId);

        callback(); // This will trigger the resolve in the client's promise
    });
});

server.listen(port, () => {
    console.log("Listen on the port", port, "...");
});