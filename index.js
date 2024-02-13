const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "../hradni-hlidka/dist")));

app.listen(3002, () => {
    console.log("Listen on the port 3002...");
});