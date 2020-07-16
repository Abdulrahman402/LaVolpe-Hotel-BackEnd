const express = require("express");

const router = express.Router();

// Authentication and Authorization Middleware functions
const auth = require("../Middlewares/auth");
const isAdmin = require("../Middlewares/isAdmin");
const isVerefied = require("../Middlewares/isVerefied");

// Routes controller functions path
const signUp = require("../Controllers/User/SignUp");
const allUsers = require("../Controllers/User/allUsers");
const allAdmins = require("../Controllers/User/allAdmins");
const bookingHistory = require("../Controllers/User/bookingHistory");
const myProfile = require("../Controllers/User/myProfile");
const changeName = require("../Controllers/User/changeName");
const changePassword = require("../Controllers/User/changePassword");
const changePhone = require("../Controllers/User/changePhone");
const verify = require("../Controllers/User/verify");

router.post("/signUp", signUp.SignUp);

router.get("/allusers", auth, isAdmin, isVerefied, allUsers.allUsers);

router.get("/allAdmins", auth, isAdmin, isVerefied, allAdmins.allAdmins);

router.get("/bookingHistory", auth, isVerefied, bookingHistory.bookingHistory);

router.get("/me", auth, isVerefied, myProfile.myProfile);

router.put("/changeName", auth, isVerefied, changeName.changeName);

router.put("/changePhone", auth, isVerefied, changePhone.changePhone);

router.put("/changePassword", auth, isVerefied, changePassword.changePassword);

router.put("/verify", auth, verify.verify);

module.exports = router;
