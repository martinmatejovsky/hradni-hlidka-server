const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app); // Create an HTTP server using Express
const io = new Server(server);
const cors = require('cors'); // Import the cors middleware
const path = require("path");
const port = 4000;
const gameLocationsRouter = require('./routes/game-locations');
const gameRouter = require('./routes/game');

// Middleware
app.use(express.static(path.join(__dirname, "../hradni-hlidka/dist")));
app.use(cors());
app.use(express.json());
app.use('/api/game-locations', gameLocationsRouter);
app.use('/api/game', gameRouter);

io.on('connection', (client) => {
    const gameId = client.handshake.query.gameId;
    const player = client.handshake.query.player;
    console.log(gameId);

    io.on('createGame', () => {
        client.join(gameId);
    });

    io.to(gameId).emit('newPlayerJoined', player);
});

server.listen(port, () => {
    console.log("Listen on the port" + port + "...");
});