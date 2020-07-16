const { Room, updateRoomPricePerNight } = require("../../Models/Room");

exports.changeRoomPrice = async function (req, res, next) {
  const { error } = updateRoomPricePerNight(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  await Room.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { pricePerNight: req.body.price } },
    { new: true }
  );
  res.send("Price changed");
};
