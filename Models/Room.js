const mongoose = require("mongoose");
const joi = require("joi");

const keys = require("../Config/keys");

const Schema = mongoose.Schema;

const roomSchema = Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    veiw: {
      type: String,
      required: true,
    },
    availability: {
      type: Boolean,
      required: true,
      default: true,
    },
    currentGuest: {
      guestId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

function validateRoom(room) {
  const schema = {
    id: joi.number().required(),
    capacity: joi.number().required(),
    floor: joi.number().required(),
    view: joi.string().required(),
    pricePerNight: joi.number().required(),
  };
  return joi.validate(room, schema);
}

function updateRoom(room) {
  const schema = {
    id: joi.number().required(),
    capacity: joi.number(),
    floor: joi.number(),
    view: joi.string(),
    pricePerNight: joi.number(),
  };
  return joi.validate(room, schema);
}

module.exports = {
  Room,
  validateRoom,
  updateRoom,
};
