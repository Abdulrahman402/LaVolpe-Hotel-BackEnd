module.exports = (req, res, next) => {
  if (!req.user.isVerefied)
    return res.status(401).send("Please verify your account");
  next();
};
