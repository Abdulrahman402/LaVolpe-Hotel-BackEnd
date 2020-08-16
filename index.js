require("express-async-errors");
const express = require("express");
const winston = require("winston");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const keys = require("./Config/keys");
const user = require("./Routes/user");
const auth = require("./Routes/auth");
const room = require("./Routes/room");
const ticket = require("./Routes/ticket");
const picture = require("./Controllers/Picture/addPicture");
const removePic = require("./Controllers/Picture/removePicture");

app.get("/", async (req, res) => {
  res.send("Hello");
  console.log("Hi");
});

mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("Connected to Hotel DB"))
  .catch(err => console.log("Error while connecting DB", err));

const port = process.env.PORT || 2000;

const server = app.listen(port, () => {
  winston.info(`Listening on port ${port}`);
});

app.use(express.json());
app.use(cors());
app.use("/Image", express.static("Image"));
app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api/room", room);
app.use("/api/ticket", ticket);
app.use("/api/picture", picture);
app.use("/api/removePic", removePic);

module.exports = server;
