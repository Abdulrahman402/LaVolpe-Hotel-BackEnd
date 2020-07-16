const { Room, updateRoomCapacity } = require("../../Models/Room");

exports.changeRoomCapacity = async function (req, res, next) {
  const { error } = updateRoomCapacity(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  await Room.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { capacity: req.body.capacity } },
    { new: true }
  );
  res.send("Capacity changed");
};
