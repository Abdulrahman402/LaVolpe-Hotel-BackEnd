const { Room } = require("../../Models/Room");
const { User } = require("../../Models/User");
const momentTZ = require("moment-timezone");

exports.allRooms = async function(req, res, next) {
  const capacity = req.query.capacity;
  const branch = req.query.branch;
  let startDate = req.query.startDate;
  let endDate = req.query.endDate;

  //Adjust the timezone to Africa, Egypt
  startDate = momentTZ.tz(startDate, "Africa/Cairo").format();
  endDate = momentTZ.tz(endDate, "Africa/Cairo").format();

  //Retrieve rooms IDs that match below conditions
  if (capacity || branch || startDate || endDate) {
    const reservedRoom = await User.find({
      $and: [
        { "duration.checkIn": { $gte: startDate } },
        { "duration.checkOut": { $lte: endDate } }
      ]
    }).select();

    //Map these IDs
    const reservedRoomId = reservedRoom.map(id => {
      return id.reservedRoomId;
    });

    //Retrieve rooms matches capacity, branch and are not in IDs we are mapped
    const room = await Room.find({
      capcity: capacity,
      branch: branch,
      _id: { $nin: reservedRoomId }
    }).select("-_id -ticket -id -createdAt -updatedAt");

    res.send(room);
  }
};
