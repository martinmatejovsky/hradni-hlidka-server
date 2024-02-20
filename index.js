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
const fs = require('fs'); // Import the fs module

// Middleware
app.use(express.static(path.join(__dirname, "../hradni-hlidka/dist")));
app.use(cors());
app.use(express.json());
app.use('/api/game-locations', gameLocationsRouter);
app.use('/api/game', gameRouter);

io.on('connection', (client) => {
    client.on('joinGame', (payload) => {
        client.join(payload.gameId);

        const controllerFile = `./controllers/testGameController-${payload.gameId}.js`;

        if (fs.existsSync(controllerFile)) {
            const { joinNewPlayer } = require(controllerFile);
            const gameWitNewPlayer = joinNewPlayer(payload.player);

            io.to(payload.gameId).emit('newPlayerJoined', gameWitNewPlayer)
        } else {
            console.error(`Controller file for gameId ${payload.gameId} does not exist`);
        }

    });
});

server.listen(port, () => {
    console.log("Listen on the port" + port + "...");
});