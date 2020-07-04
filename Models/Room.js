const mongoose = require("mongoose");
const joi = require("joi");

const Schema = mongoose.Schema;

const roomSchema = new Schema(
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

function updateRoomId(room) {
  const schema = {
    id: joi.number().required(),
  };
  return joi.validate(room, schema);
}

function updateRoomCapacity(room) {
  const schema = {
    capacity: joi.number(),
  };
  return joi.validate(room, schema);
}

function updateRoomFloor(room) {
  const schema = {
    floor: joi.number(),
  };
  return joi.validate(room, schema);
}

function updateRoomView(room) {
  const schema = {
    view: joi.string(),
  };
  return joi.validate(room, schema);
}

function updateRoomPricePerNight(room) {
  const schema = {
    pricePerNight: joi.number(),
  };
  return joi.validate(room, schema);
}

module.exports = {
  Room,
  validateRoom,
  updateRoomId,
  updateRoomCapacity,
  updateRoomFloor,
  updateRoomView,
  updateRoomPricePerNight,
};
