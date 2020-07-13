const express = require("express");
const _ = require("lodash");
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

  res.send(ticket);
});

module.exports = router;
