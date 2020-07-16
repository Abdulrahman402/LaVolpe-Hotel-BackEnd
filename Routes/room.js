const express = require("express");

const router = express.Router();

// Authentication and Authorization Middleware functions
const auth = require("../Middlewares/auth");
const isAdmin = require("../Middlewares/isAdmin");
const isVerefied = require("../Middlewares/isVerefied");

// Routes controller functions path
const addRoom = require("../Controllers/Room/addRoom");
const removeRoom = require("../Controllers/Room/removeRoom");
const toMaintenance = require("../Controllers/Room/toMaintenance");
const changeRoomId = require("../Controllers/Room/changeRoomId");
const changeRoomCapacity = require("../Controllers/Room/changeRoomCapacity");
const changeRoomFloor = require("../Controllers/Room/changeRoomFloor");
const changeRoomView = require("../Controllers/Room/changeRoomView");
const changeRoomPrice = require("../Controllers/Room/changeRoomPrice");
const allRooms = require("../Controllers/Room/allRooms");

router.post("/allRooms", allRooms.allRooms);

router.put(
  "/changeRoomView/:id",
  auth,
  isAdmin,
  isVerefied,
  changeRoomView.changeRoomView
);

router.post("/addRoom", auth, isAdmin, isVerefied, addRoom.addRoom);

router.delete(
  "/removeRoom/:id",
  auth,
  isAdmin,
  isVerefied,
  removeRoom.removeRoom
);

router.put(
  "/toMaintenance/:id",
  auth,
  isAdmin,
  isVerefied,
  toMaintenance.toMaintenance
);

router.put(
  "/changeRoomId/:id",
  auth,
  isAdmin,
  isVerefied,
  changeRoomId.changeRoomId
);

router.put(
  "/changeRoomCapacity/:id",
  auth,
  isAdmin,
  isVerefied,
  changeRoomCapacity.changeRoomCapacity
);

router.put(
  "/changeRoomFloor/:id",
  auth,
  isAdmin,
  isVerefied,
  changeRoomFloor.changeRoomFloor
);

router.put(
  "/changeRoomPrice/:id",
  auth,
  isAdmin,
  isVerefied,
  changeRoomPrice.changeRoomPrice
);

module.exports = router;
