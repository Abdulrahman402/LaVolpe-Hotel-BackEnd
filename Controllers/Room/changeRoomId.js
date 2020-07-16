const { Room, updateRoomId } = require("../../Models/Room");

exports.changeRoomId = async function (req, res, next) {
  const { error } = updateRoomId(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  await Room.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { id: req.body.id } },
    { new: true }
  );
  res.send("ID changed");
};
