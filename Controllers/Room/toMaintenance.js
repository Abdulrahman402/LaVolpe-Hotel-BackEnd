const { Room } = require("../../Models/Room");

exports.toMaintenance = async function(req, res, next) {
  const room = await Room.findOneAndUpdate({ _id: req.params.id }).select(
    "maintenance"
  );

  if (!room) {
    await Room.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { maintenance: true } },
      { new: true }
    );
    res.send("Room is under maintenance");
  }
  await Room.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { maintenance: false } },
    { new: true }
  );
  res.send("Room back to work");
};
