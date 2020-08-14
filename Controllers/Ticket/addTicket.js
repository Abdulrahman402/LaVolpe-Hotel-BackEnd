const moment = require("moment");
const momentTZ = require("moment-timezone");
const nodemailer = require("nodemailer");

const { Ticket, validateTicket } = require("../../Models/Ticket");

const { Room } = require("../../Models/Room");
const { User } = require("../../Models/User");

exports.addTicket = async function(req, res, next) {
  const { error } = validateTicket(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const room = await Room.findOne({ _id: req.params.id });
  const user = await User.findOne({ _id: req.user._id });

  let start = req.query.startDate;
  let end = req.query.endDate;

  //Adjust the timezone to Africa, Egypt
  start = momentTZ.tz(start, "Africa/Cairo").format();
  end = momentTZ.tz(end, "Africa/Cairo").format();

  //Make sure that date query is valid
  //start date should not be earlier than today
  //end date should be earlier than today and start date
  if (start < moment().format() || end < moment().format() || end < start)
    return res.send("Date is invalid");

  const ticket = new Ticket({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    startDate: start,
    endDate: end,
    room_Id: room.id,
    email: user.email
  });
  await ticket.save();

  //Updating user information according to his ticket
  await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: {
        reservedRoomId: req.params.id,
        "duration.checkIn": start,
        "duration.checkOut": end,
        ticket: ticket._id
      }
    },
    { new: true }
  );

  //Updating reserved room according to the ticket and user
  await Room.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { ticket: ticket._id } },
    { new: true }
  );

  //Sending an email to the user informing him about his booking information
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "abduwemoh@gmail.com",
      pass: "Dontshootme1"
    }
  });

  const mailoptions = {
    from: "abduwemoh@gmail.com",
    to: user.email,
    subject: "Booking",
    text: `You have successfully booked room with ID: ${room.id}`
  };

  transporter.sendMail(mailoptions);

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
