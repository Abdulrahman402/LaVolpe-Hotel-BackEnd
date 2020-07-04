const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const router = express.Router();

const {
  User,
  validateUser,
  updateUserName,
  updateUserPassword,
  updateUserPhone,
} = require("../Models/User");
const auth = require("../Middlewares/auth");
const isAdmin = require("../Middlewares/isAdmin");

router.post("/signUp", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User(
    _.pick(req.body, ["email", "firstName", "lastName", "phone", "password"])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  const token = await user.generateAuthToken();

  await user.save();

  res
    .header("x-auth-token", token)
    .send(_.pick(user, "email", "firstName", "lastName", "phone"));
});

router.get("/allusers", auth, isAdmin, async (req, res) => {
  const user = await User.find({ isAdmin: false }).select("-password");
  res.send(user);
});

router.get("/allAdmins", auth, isAdmin, async (req, res) => {
  const admin = await User.find({ isAdmin: true }).select("-password");
  res.send(admin);
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id }).select("-password");
  res.send(user);
});

router.put("/changeName", auth, async (req, res) => {
  const { error } = updateUserName(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  await User.findByIdAndUpdate(
    req.user._id,
    { firstName: req.body.newFirstName, lastName: req.body.newLastName },
    { new: true }
  );

  const user = await User.findOne({ _id: req.user._id });

  res.send(_.pick(user, "firstName", "lastName"));
});

router.put("/changePhone", auth, async (req, res) => {
  const { error } = updateUserPhone(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  await User.findByIdAndUpdate(
    req.user._id,
    { phone: req.body.newPhone },
    { new: true }
  );

  const user = await User.findOne({ _id: req.user._id });

  res.send(_.pick(user, "firstName", "lastName", "phone"));
});

router.put("/changePassword", auth, async (req, res) => {
  const { error } = updateUserPassword(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ _id: req.user._id });

  const oldPW = await bcrypt.compare(req.body.oldPW, user.password);
  if (!oldPW) return res.status(400).send("Invalid old password");

  const newUser = await User.findByIdAndUpdate(
    req.user._id,
    { password: req.body.newPW },
    { new: true }
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newUser.password, salt);

  await user.save();

  res.send(_.pick(user, "firstName", "lastName"));
});

module.exports = router;
