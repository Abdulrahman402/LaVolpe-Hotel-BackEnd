const { User } = require("../../Models/User");

exports.allAdmins = async function (req, res, next) {
  const admin = await User.find({ isAdmin: true }).select("-password -_id");
  res.send(admin);
};
