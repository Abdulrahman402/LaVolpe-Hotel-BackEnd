const mongoose = require("mongoose");

const Schema = mongoose.Schema;

picSchema = new Schema({
  picture: {
    type: String
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room"
  }
});

const Picture = mongoose.model("Picture", picSchema);

module.exports = { Picture };
