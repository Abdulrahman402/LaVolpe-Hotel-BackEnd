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
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Ticket =  mongoose.model('Ticket', ticketSchema)

function updateStartTicket(ticket) {
    const schema = {
        startDate = joi.date().required()
    }
    return joi.validate(ticket, schema)
}

function updateEndTicket(ticket) {
    const schema = {
        endDate = joi.date().required()
    }
    return joi.validate(ticket, schema)
}

module.exports = {
    Ticket,
    updateStartTicket,
    updateEndTicket
}