const mongoose = require("mongoose");
const joi = require("joi");

const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    id: {
      type: Number,
      required: true
    },
    capacity: {
      type: Number,
      required: true
    },
    floor: {
      type: Number,
      required: true
    },
    view: {
      type: String,
      required: true
    },
    availability: {
      type: Boolean,
      default: true
    },
    pricePerNight: {
      type: Number,
      required: true
    },
    maintenance: {
      type: Boolean,
      default: false
    },
    branch: {
      type: String,
      required: true
    },
    ticket: {
      type: [Schema.Types.ObjectId],
      ref: "Ticket"
    },
    currentGuest: String
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
    branch: joi.string().required()
  };
  return joi.validate(room, schema);
}

function updateRoomId(room) {
  const schema = {
    id: joi.number().required()
  };
  return joi.validate(room, schema);
}

function updateRoomCapacity(room) {
  const schema = {
    capacity: joi.number()
  };
  return joi.validate(room, schema);
}

function updateRoomFloor(room) {
  const schema = {
    floor: joi.number()
  };
  return joi.validate(room, schema);
}

function updateRoomView(room) {
  const schema = {
    view: joi.string()
  };
  return joi.validate(room, schema);
}

function updateRoomPricePerNight(room) {
  const schema = {
    pricePerNight: joi.number()
  };
  return joi.validate(room, schema);
}

function updateRoomBranch(branch) {
  const schema = {
    branch: joi.string()
  };
  return joi.validate(branch, schema);
}

function filterRoom(room) {
  const schema = {
    capacity: joi.number(),
    view: joi.string()
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
  filterRoom,
  updateRoomBranch
};
