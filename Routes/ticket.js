const express = require("express");

const router = express.Router();

// Authentication and Authorization Middleware function
const auth = require("../Middlewares/auth");
const isAdmin = require("../Middlewares/isAdmin");

// Routes controller functions path
const addTicket = require("../Controllers/Ticket/addTicket");
const myTicket = require("../Controllers/Ticket/myTicket");
const deleteTicket = require("../Controllers/Ticket/deleteTicket");
const checkIn = require("../Controllers/Ticket/checkIn");
const checkOut = require("../Controllers/Ticket/checkOut");
const findTicket = require("../Controllers/Ticket/findTicket");

router.get("/findTicket", auth, isAdmin, findTicket.findTicket);

router.post("/addTicket/:id", auth, addTicket.addTicket);

router.get("/myTicket", auth, myTicket.myTicket);

router.delete("/deleteTicket/:id", auth, deleteTicket.deleteTicket);

router.put("/checkIn/:id", auth, isAdmin, checkIn.checkIn);

router.delete("/checkOut/:id", auth, isAdmin, checkOut.checkOut);

module.exports = router;
