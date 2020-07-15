const bcrypt = require("bcryptjs");
const _ = require("lodash");

const { User, updateUserPassword } = require("../../Models/User");

exports.changePassword = async function (req, res, next) {
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
};
