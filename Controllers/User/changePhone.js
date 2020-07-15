const _ = require("lodash");

const { User, updateUserPhone } = require("../../Models/User");

exports.changePhone = async function (req, res, next) {
  const { error } = updateUserPhone(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  await User.findByIdAndUpdate(
    req.user._id,
    { phone: req.body.newPhone },
    { new: true }
  );

  const user = await User.findOne({ _id: req.user._id });

  res.send(_.pick(user, "firstName", "lastName", "phone"));
};
