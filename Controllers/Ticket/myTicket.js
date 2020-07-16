const { Ticket } = require("../../Models/Ticket");

exports.myTicket = async function (req, res, next) {
  const ticket = await Ticket.find({ guestId: req.user._id })
    .populate("guestId", "firstName lastName  -_id")
    .populate("roomId", "id -_id")
    .select();

  res.send(ticket);
};
