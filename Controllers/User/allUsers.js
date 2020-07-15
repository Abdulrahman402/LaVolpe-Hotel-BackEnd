const { User } = require("../../Models/User");

exports.allUsers = async function (req, res, next) {
  const user = await User.find({ isAdmin: false }).select(
    "-password -isAdmin -_id"
  );
  res.send(user);
};
