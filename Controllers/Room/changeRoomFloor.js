const { Room, updateRoomFloor } = require("../../Models/Room");

exports.changeRoomFloor = async function (req, res, next) {
  const { error } = updateRoomFloor(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  await Room.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { floor: req.body.floor } },
    { new: true }
  );
  res.send("floor changed");
};
