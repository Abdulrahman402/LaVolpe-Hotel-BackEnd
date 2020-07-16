const _ = require("lodash");

const { Room, validateRoom } = require("../../Models/Room");

exports.addRoom = async function (req, res, next) {
  const { error } = validateRoom(req.body);
  if (error) res.status(400).send(error.details[0].message);

  let room = new Room(
    _.pick(req.body, ["id", "capacity", "floor", "view", "pricePerNight"])
  );

  await room.save();

  res.send(room);
};
