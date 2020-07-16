const { Ticket } = require("../../Models/Ticket");

exports.deleteTicket = async function (req, res, next) {
  await Ticket.findOneAndRemove({ _id: req.params.id });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "example@example.com",
      pass: "password",
    },
  });

  const mailoptions = {
    from: "example@example.com",
    to: user.contactEmail,
    subject: "Booking",
    text: `You have successfully Cancelled you booking`,
  };

  transporter.sendMail(mailoptions);

  res.send("Ticket Deleted");
};
