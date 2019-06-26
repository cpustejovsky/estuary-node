const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const middleWare = require("../middleware/index.js");

router.get("/", middleWare.isLoggedIn, (req, res) => {
  res.render("notes/index");
});

router.get("/new", middleWare.isLoggedIn, (req, res) => {
  res.render("notes/new");
});

module.exports = router;
