const { Room, filterRoom } = require("../../Models/Room");

exports.allRooms = async function (req, res, next) {
  const { error } = filterRoom(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const capacity = req.query.capacity;
  const branch = req.query.branch;

  if (capacity || branch) {
    const room = await Room.find({
      $and: [{ capacity: capacity }, { branch: branch }],
    }).select();

    res.send(room);
  }
  const room = await Room.find()
    .populate("currentGuest.guestId", "firstName lastName -_id")
    .select();
  res.send(room);
};
