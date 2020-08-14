const { Ticket } = require("../../Models/Ticket");
const { User } = require("../../Models/User");
const { Room } = require("../../Models/Room");

//In this case, the user is getting ready to leave the hotel after booking duration ended
exports.checkOut = async function(req, res, next) {
  //Remove his ticket from database
  const ticket = await Ticket.findOneAndRemove({
    _id: req.params.id,
    isActive: true
  });
  if (!ticket) return res.status(404).send("Ticket has not been activated yet");

  //Deleting ticket and room information from user collection
  await User.findOneAndUpdate(
    { ticket: req.params.id },
    {
      $unset: {
        reservedRoomId: "",
        duration: "",
        ticket: ""
      }
    },
    { new: true }
  );

  //Removing ticket ID from Room collection
  await Room.findOneAndUpdate(
    { ticket: req.params.id },
    { $pull: { ticket: req.params.id } },
    { new: true }
  );

  res.send("Checkout Done");
};
