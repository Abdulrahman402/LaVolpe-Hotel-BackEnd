const { User } = require("../../Models/User");

exports.verify = async function (req, res, next) {
  const user = await User.findOneAndUpdate(
    req.user._id,
    { $set: { isVerefied: true } },
    { new: true }
  );
  const token = await user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send("Congratulations, your account is verified");
};
