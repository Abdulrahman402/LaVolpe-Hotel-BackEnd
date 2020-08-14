const express = require("express");

const router = express.Router();

// Authentication and Authorization Middleware functions
const auth = require("../Middlewares/auth");
const isAdmin = require("../Middlewares/isAdmin");

// Routes controller functions path
const addRoom = require("../Controllers/Room/addRoom");
const removeRoom = require("../Controllers/Room/removeRoom");
const toMaintenance = require("../Controllers/Room/toMaintenance");
const changeRoomId = require("../Controllers/Room/changeRoomId");
const changeRoomCapacity = require("../Controllers/Room/changeRoomCapacity");
const changeRoomFloor = require("../Controllers/Room/changeRoomFloor");
const changeRoomView = require("../Controllers/Room/changeRoomView");
const changeRoomPrice = require("../Controllers/Room/changeRoomPrice");
const changeRoomBranch = require("../Controllers/Room/changeRoomBranch");
const allRooms = require("../Controllers/Room/allRooms");

router.get("/allRooms", auth, allRooms.allRooms);

router.put("/changeRoomView/:id", auth, isAdmin, changeRoomView.changeRoomView);

router.post("/addRoom", auth, isAdmin, addRoom.addRoom);

router.delete("/removeRoom/:id", auth, isAdmin, removeRoom.removeRoom);

router.put("/toMaintenance/:id", auth, isAdmin, toMaintenance.toMaintenance);

router.put("/changeRoomId/:id", auth, isAdmin, changeRoomId.changeRoomId);

router.put(
  "/changeRoomCapacity/:id",
  auth,
  isAdmin,
  changeRoomCapacity.changeRoomCapacity
);

router.put(
  "/changeRoomFloor/:id",
  auth,
  isAdmin,
  changeRoomFloor.changeRoomFloor
);

router.put(
  "/changeRoomPrice/:id",
  auth,
  isAdmin,
  changeRoomPrice.changeRoomPrice
);

router.put(
  "/changeRoomBranch/:id",
  auth,
  isAdmin,
  changeRoomBranch.changeRoomBranch
);

module.exports = router;
