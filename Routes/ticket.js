const express = require("express");

const router = express.Router();

// Authentication and Authorization Middleware function
const auth = require("../Middlewares/auth");

// Routes controller functions path
const addTicket = require("../Controllers/Ticket/addTicket");
const myTicket = require("../Controllers/Ticket/myTicket");
const deleteTicket = require("../Controllers/Ticket/deleteTicket");

router.post("/addTicket/:id", auth, addTicket.addTicket);
router.get("/myTicket", auth, myTicket.myTicket);
router.delete("/deleteTicket/:id", auth, deleteTicket.deleteTicket);

module.exports = router;
