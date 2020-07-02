require("express-async-errors");
const express = require("express");
const winston = require("winston");
const cors = require("cors");

const app = express();

app.get("/", async (req, res) => {
  res.send("Hello");
  console.log("Hi");
});

const port = process.env.PORT || 2000;

const server = app.listen(port, () => {
  winston.info(`Listening on port ${port}`);
});

app.use(cors());

module.exports = server;
