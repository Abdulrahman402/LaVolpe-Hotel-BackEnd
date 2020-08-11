const { Room, updateRoomBranch } = require("../../Models/Room");

exports.changeRoomBranch = async function (req, res, next) {
  const { error } = updateRoomBranch(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  await Room.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { branch: req.body.branch } },
    { new: true }
  );
  res.send("Branch changed");
};
