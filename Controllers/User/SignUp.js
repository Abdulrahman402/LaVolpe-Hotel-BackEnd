const _ = require("lodash");
const bcrypt = require("bcryptjs");

const { User, validateUser } = require("../../Models/User");

exports.SignUp = async function (req, res, next) {
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
};
