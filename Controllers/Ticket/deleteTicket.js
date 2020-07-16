const { Ticket } = require("../../Models/Ticket");

exports.deleteTicket = async function (req, res, next) {
  await Ticket.findOneAndRemove({ _id: req.params.id });

  res.send("Ticket Deleted");
};
