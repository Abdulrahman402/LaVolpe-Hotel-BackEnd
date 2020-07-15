const _ = require("lodash");

const { User, updateUserName } = require("../../Models/User");

exports.changeName = async function (req, res, next) {
  const { error } = updateUserName(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  await User.findByIdAndUpdate(
    req.user._id,
    { firstName: req.body.newFirstName, lastName: req.body.newLastName },
    { new: true }
  );

  const user = await User.findOne({ _id: req.user._id });

  res.send(_.pick(user, "firstName", "lastName"));
};
