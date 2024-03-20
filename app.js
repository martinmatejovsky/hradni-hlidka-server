const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app); // Create an HTTP server using Express
const cors = require('cors');
const path = require("path");
const port = 8080;
const gameLocationsRouter = require('./routes/game-locations');
const gameRouter = require('./routes/game');
const frontendPath = process.env.FRONTEND_PATH || "../hradni-hlidka/dist";
const initializeSocket = require('./controllers/socketIo');

// Middleware
app.use(cors());
app.use(express.json());
initializeSocket(server);
app.use('/api/game-locations', gameLocationsRouter);
app.use('/api/game', gameRouter);
app.use(express.static(path.join(__dirname, frontendPath)));

server.listen(port, () => {
    console.log("Listen on the port", port, "...");
});