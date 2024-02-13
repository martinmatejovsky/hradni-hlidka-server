const express = require("express");
const { createServer } = require('node:http');
const path = require("path");
const { Server } = require('socket.io');
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "../hradni-hlidka/dist")));
const gameLocationsRouter = require('./routes/game-locations');
const gameRouter = require('./routes/game');

app.use('/api/game-locations', gameLocationsRouter);
app.use('/api/game', gameRouter);

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(3002, () => {
    console.log("Listen on the port 3002...");
});