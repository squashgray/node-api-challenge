const express = require("express");
const cors = require("cors");
const projectRouter = require("../routers/projectRouter");
const actionRouter = require("../routers/actionRouter");
const server = express();

server.use(express.json(), logger);
server.use(cors());

server.get("/", (req, res) => {
  res.send(`<h2>HELLO THERE</h2>`);
});

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

function logger(req, res, next) {
  const newDate = new Date(Date.now());
  console.log(
    `${req.method} to ${
      req.originalUrl
    } at ${newDate.toDateString()}, ${newDate.toTimeString()}`
  );
  next();
}

module.exports = server;
