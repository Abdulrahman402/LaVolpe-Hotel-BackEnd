const mongoose = require("mongoose");
const timeZone = require("mongoose-timezone");
const joi = require("joi");

const Schema = mongoose.Schema;

const ticketSchema = Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room"
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    phone: {
      type: String,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

ticketSchema.plugin(timeZone, { paths: ["startDate", "endDate"] });
const Ticket = mongoose.model("Ticket", ticketSchema);

function validateTicket(ticket) {
  const schema = {
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    phone: joi.string().required()
  };
  return joi.validate(ticket, schema);
}

module.exports = {
  Ticket,
  validateTicket
};
