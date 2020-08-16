const express = require("express");

const { Picture } = require("../../Models/Picture");
const { Room } = require("../../Models/Room");

const router = express.Router();

const auth = require("../../Middlewares/auth");
const isAdmin = require("../../Middlewares/isAdmin");

router.put("/removePicture/:roomID/:picID", auth, isAdmin, async (req, res) => {
  const picPath = await Picture.findOne({ _id: req.params.picID });

  await Room.findOneAndUpdate(
    { _id: req.params.roomID },
    { $pull: { picture: picPath.picture } },
    { new: true }
  );

  const room = await Room.findOne({ _id: req.params.roomID }).select(
    "id capacity floor view picture pricePerNight -_id"
  );

  await Picture.findOneAndRemove({ _id: req.params.picID });
  res.send(room);
});

module.exports = router;
