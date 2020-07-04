const express = require("express");
const _ = require("lodash");

const router = express.Router();

const {
  Room,
  validateRoom,
  updateRoomId,
  updateRoomCapacity,
  updateRoomFloor,
  updateRoomView,
  updateRoomPricePerNight,
} = require("../Models/Room");

const auth = require("../Middlewares/auth");
const isAdmin = require("../Middlewares/isAdmin");

router.post("/addRoom", auth, isAdmin, async (req, res) => {
  const { error } = validateRoom(req.body);
  if (error) res.status(400).send(error.details[0].message);

  let room = new Room(
    _.pick(req.body, ["id", "capacity", "floor", "view", "pricePerNight"])
  );

  await room.save();

  res.send(room);
});

router.delete("/removeRoom/:id", auth, isAdmin, async (req, res) => {
  await Room.findOneAndRemove({ _id: req.params.id });

  res.send("Room  removed from system");
});

router.put("/toMaintenance/:id", auth, isAdmin, async (req, res) => {
  await Room.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { maintenance: true } },
    { new: true }
  );
  res.send("Room is under maintenance");
});

router.put("/changeRoomId/:id", auth, isAdmin, async (req, res) => {
  const { error } = updateRoomId(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  await Room.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { id: req.body.id } },
    { new: true }
  );
  res.send("ID changed");
});

router.put("/changeRoomCapacity/:id", auth, isAdmin, async (req, res) => {
  const { error } = updateRoomCapacity(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  await Room.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { capacity: req.body.capacity } },
    { new: true }
  );
  res.send("Capacity changed");
});

router.put("/changeRoomFloor/:id", auth, isAdmin, async (req, res) => {
  const { error } = updateRoomFloor(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  await Room.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { floor: req.body.floor } },
    { new: true }
  );
  res.send("floor changed");
});

router.put("/changeRoomView/:id", auth, isAdmin, async (req, res) => {
  const { error } = updateRoomView(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  await Room.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { view: req.body.view } },
    { new: true }
  );
  res.send("View changed");
});

router.put("/changeRoomPrice/:id", auth, isAdmin, async (req, res) => {
  const { error } = updateRoomPricePerNight(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  await Room.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { pricePerNight: req.body.price } },
    { new: true }
  );
  res.send("Price changed");
});

module.exports = router;
