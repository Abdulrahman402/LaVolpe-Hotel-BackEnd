const { Ticket } = require("../../Models/Ticket");

const moment = require("moment");

//In this case, the user just arrived to hotel and checks in
exports.checkIn = async function(req, res, next) {
  //Updating his ticket to active, which means he is in the hotel
  const ticket = await Ticket.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { isActive: true } },
    { new: true }
  );

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
