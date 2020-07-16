const { Room, filterRoom } = require("../../Models/Room");

exports.allRooms = async function (req, res, next) {
  const { error } = filterRoom(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const capacity = req.body.capacity;
  const floor = req.body.floor;
  const view = req.body.view;
  const fromPrice = req.body.fromPrice;
  const toPrice = req.body.toPrice;

  if (capacity || floor || view || fromPrice || toPrice) {
    const room = await Room.find({
      $or: [
        { capacity: capacity },
        { view: view },
        { floor: floor },
        { pricePerNight: { $gte: fromPrice, $lte: toPrice } },
      ],
    })
      .populate("currentGuest.guestId", "firstName lastName -_id")
      .select();

    res.send(room);
  }
  const room = await Room.find()
    .populate("currentGuest.guestId", "firstName lastName -_id")
    .select();
  res.send(room);
};
