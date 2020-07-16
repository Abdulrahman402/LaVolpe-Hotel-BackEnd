const { Room, updateRoomView } = require("../../Models/Room");

exports.changeRoomView = async function (req, res, next) {
  const { error } = updateRoomView(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  await Room.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { view: req.body.view } },
    { new: true }
  );
  res.send("View changed");
};
