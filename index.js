require("express-async-errors");
const express = require("express");
const winston = require("winston");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const keys = require("./Config/keys");

app.get("/", async (req, res) => {
  res.send("Hello");
  console.log("Hi");
});

mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("Connected to Hotel DB"))
  .catch((err) => console.log("Error while connecting DB", err));

const port = process.env.PORT || 2000;

const server = app.listen(port, () => {
  winston.info(`Listening on port ${port}`);
});

app.use(cors());

module.exports = server;
