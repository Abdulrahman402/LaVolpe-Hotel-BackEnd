const moment = require("moment");

const { Ticket, validateTicket } = require("../../Models/Ticket");
const { User } = require("../../Models/User");
const { Room } = require("../../Models/Room");

exports.addTicket = async function (req, res, next) {
  let start = req.body.startDate;
  let end = req.body.endDate;

  start = moment(start).format();
  end = moment(end).format();

  const { error } = validateTicket(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const room = await Room.findOne({ _id: req.params.id });
  if (!room.availability || room.maintenance)
    return res.send("Room is not available");

  if (start < moment().format() || end < moment().format() || end < start)
    return res.send("Date is invalid");

  const ticket = new Ticket({
    startDate: start,
    endDate: end,
    roomId: req.params.id,
    guestId: req.user._id,
  });
  await ticket.save();

  await User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { "oldBooking.ticket": req.params.id } },
    { new: true }
  );

  await Room.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { "currentGuest.guestId": req.user._id } },
    { new: true }
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "example@example.com",
      pass: "password",
    },
  });

  const mailoptions = {
    from: "example@example.com",
    to: user.contactEmail,
    subject: "Booking",
    text: `You have successfully booked room with ID: ${room.id}`,
  };

  transporter.sendMail(mailoptions);

  res.send("Ticket Added");
};
