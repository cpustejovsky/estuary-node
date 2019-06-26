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

router.post("/", middleWare.isLoggedIn, (req, res) => {
  res.send("successful post route (but nothing happened)");
});

module.exports = router;
