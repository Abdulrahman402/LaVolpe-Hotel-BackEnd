const mongoose = require("mongoose");
const joi = require("joi");

const Schema = mongoose.Schema;

const ticketSchema = Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
    guestId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

function validateTicket(ticket) {
  const schema = {
    startDate: joi.string().required(),
    endDate: joi.string().required(),
  };
  return joi.validate(ticket, schema);
}

function updateStartTicket(ticket) {
  const schema = {
    startDate: joi.string().required(),
  };
  return joi.validate(ticket, schema);
}

function updateEndTicket(ticket) {
  const schema = {
    endDate: joi.string().required(),
  };
  return joi.validate(ticket, schema);
}

module.exports = {
  Ticket,
  updateStartTicket,
  updateEndTicket,
  validateTicket,
};
