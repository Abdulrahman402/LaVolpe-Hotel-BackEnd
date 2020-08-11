const express = require("express");

const router = express.Router();

// Authentication and Authorization Middleware functions
const auth = require("../Middlewares/auth");
const isAdmin = require("../Middlewares/isAdmin");

// Routes controller functions path
const signUp = require("../Controllers/User/SignUp");
const allUsers = require("../Controllers/User/allUsers");
const allAdmins = require("../Controllers/User/allAdmins");
const myProfile = require("../Controllers/User/myProfile");
const changeName = require("../Controllers/User/changeName");
const changePassword = require("../Controllers/User/changePassword");

router.post("/signUp", signUp.SignUp);

router.get("/allusers", auth, isAdmin, allUsers.allUsers);

router.get("/allAdmins", auth, isAdmin, allAdmins.allAdmins);

router.get("/me", auth, myProfile.myProfile);

router.put("/changeName", auth, changeName.changeName);

router.put("/changePassword", auth, changePassword.changePassword);

module.exports = router;
