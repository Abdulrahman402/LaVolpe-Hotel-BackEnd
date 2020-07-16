const { Room } = require("../../Models/Room");

exports.toMaintenance = async function (req, res, next) {
  await Room.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { maintenance: true } },
    { new: true }
  );
  res.send("Room is under maintenance");
};
