const express = require("express");

const router = express.Router();

// Authentication and Authorization Middleware function
const auth = require("../Middlewares/auth");
const isAdmin = require("../Middlewares/isAdmin");

// Routes controller functions path
const addTicket = require("../Controllers/Ticket/addTicket");
const myTicket = require("../Controllers/Ticket/myTicket");
const deleteTicket = require("../Controllers/Ticket/deleteTicket");

router.post("/addTicket/:id", addTicket.addTicket);

router.get("/myTicket", myTicket.myTicket);

router.delete("/deleteTicket/:id", deleteTicket.deleteTicket);

module.exports = router;
