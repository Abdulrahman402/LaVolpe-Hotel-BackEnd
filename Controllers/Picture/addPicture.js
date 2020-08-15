const multer = require("multer");
const express = require("express");

const { Picture } = require("../../Models/Picture");
const { Room } = require("../../Models/Room");

const router = express.Router();

const auth = require("../../Middlewares/auth");
const isAdmin = require("../../Middlewares/isAdmin");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "Image");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer(
  {
    storage: storage,
    limits: {
      fileSize: 3000000
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error("Please upload an image"));
      }
      cb(undefined, true);
    }
  },
  (error, req, res, next) => {
    res.status(404).send({ error: error.message });
  }
);

router.post(
  "/uploadRoomPic/:id",
  auth,
  isAdmin,
  upload.single("upload"),
  async (req, res) => {
    const picture = new Picture({
      picture: req.file.path,
      room: req.params.id
    });
    await picture.save();

    await Room.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { picture: req.file.path } },
      { new: true }
    );

    const room = await Room.find({ _id: req.params.id }).select(
      "id capacity floor view picture pricePerNight -_id"
    );

    res.send(room);
  }
);

module.exports = router;
