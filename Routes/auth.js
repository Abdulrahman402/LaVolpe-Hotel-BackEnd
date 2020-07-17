const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const joi = require("joi");

const router = express.Router();

const { User } = require("../Models/User");

router.post("/signIn", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPW = await bcrypt.compare(req.body.password, user.password);
  if (!validPW) return res.status(400).send("Invalid email or password");

  const token = await user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["firstName", "lastName", "email", "phone"]));
});

function validate(req) {
  const schema = {
    email: joi.string().required().email(),
    password: joi.string().required(),
  };
  return joi.validate(req, schema);
}

module.exports = router;
