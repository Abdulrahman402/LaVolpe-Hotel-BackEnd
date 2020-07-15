const { Ticket } = require("../../Models/Ticket");

exports.bookingHistory = async function (req, res, next) {
  const bookHistory = await Ticket.find({ guestId: req.user._id })
    .populate("guestId", "firstName lastName -_id")
    .populate("roomId", "id -_id")
    .select("-_id");

  res.send(bookHistory);
};
