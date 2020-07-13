const express = require("express");
const moment = require("moment");

const router = express.Router();

const {
  Ticket,
  updateStartTicket,
  updateEndTicket,
  validateTicket,
} = require("../Models/Ticket");
const auth = require("../Middlewares/auth");
const { Room } = require("../Models/Room");
const { User } = require("../Models/User");

router.post("/addTicket/:id", auth, async (req, res) => {
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

  res.send("Ticket Added");
});

router.get("/myTicket", auth, async (req, res) => {
  const ticket = await Ticket.find({ guestId: req.user._id })
    .populate("guestId", "firstName lastName  -_id")
    .populate("roomId", "id -_id")
    .select();

  res.send(ticket);
});

router.delete("/deleteTicket/:id", auth, async (req, res) => {
  await Ticket.findOneAndRemove({ _id: req.params.id });

  res.send("Ticket Deleted");
});

module.exports = router;
