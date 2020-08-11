const moment = require("moment");
const nodemailer = require("nodemailer");

const { Ticket, validateTicket } = require("../../Models/Ticket");
const { User } = require("../../Models/User");
const { Room } = require("../../Models/Room");

exports.addTicket = async function (req, res, next) {
  const user = await User.findOne({ _id: req.user._id });

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
    { $push: { "currentBooking.ticket": req.params.id } },
    { new: true }
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "abduwemoh@gmail.com",
      pass: "Dontshootme1",
    },
  });

  const mailoptions = {
    from: "abduwemoh@gmail.com",
    to: user.contactEmail,
    subject: "Booking",
    text: `You have successfully booked room with ID: ${room.id}`,
  };

  transporter.sendMail(mailoptions);

  res.send("Ticket Added");
};
