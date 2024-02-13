const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "../hradni-hlidka/dist")));
const gameLocationsRouter = require('./routes/game-locations');
app.use('/api/game-locations', gameLocationsRouter);

app.listen(3002, () => {
    console.log("Listen on the port 3002...");
});