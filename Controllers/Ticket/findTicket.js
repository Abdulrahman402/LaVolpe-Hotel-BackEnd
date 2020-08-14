const { Ticket } = require("../../Models/Ticket");
const moment = require("moment");

//Searching for some ticket
exports.findTicket = async function(req, res, next) {
  const ticket = await Ticket.findOne({ email: req.query.email });
  if (!ticket)
    return res.status(404).send("No such a ticket with this phone number");

  //Formatting date when retrieves only
  const formattedStartDate = moment(ticket.startDate).format("MMMM Do YYYY");
  const formattedEndDate = moment(ticket.endDate).format("MMMM Do YYYY");

  //Sending these formatted data to user
  const ticketData = [
    { status: ticket.isActive },
    { "First name": ticket.firstName },
    { "Last name": ticket.lastName },
    { Phone: ticket.phone },
    { "Check in date": formattedStartDate },
    { "Check out date": formattedEndDate }
  ];

  res.send(ticketData);
};
