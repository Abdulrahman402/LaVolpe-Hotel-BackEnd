const { Room } = require("../../Models/Room");

exports.removeRoom = async function (req, res, next) {
  await Room.findOneAndRemove({ _id: req.params.id });

  res.send("Room  removed from system");
};
