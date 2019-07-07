const express = require("express");
const router = express.Router();
const passport = require("passport");
const moment = require("moment");
const middleWare = require("../middleware/index.js");

const User = require("../models/user");
const FreeWrite = require("../schemas/freeWriteSchema");

router.get("/", middleWare.isLoggedIn, (req, res) => {
  res.render("freeWrites/index");
});

router.get("/new", middleWare.isLoggedIn, (req, res) => {
  let today = moment().format("MM-DD-YYYY");
  res.render("freeWrites/new", { time: today });
});

router.post("/", middleWare.isLoggedIn, (req, res) => {
  const newFreeWrite = {
    title: req.body.freeWrite.title,
    content: req.body.freeWrite.content
  };
  req.user.freeWrites.push(newFreeWrite);
  req.user.save(err => {
    if (err) {
      console.log(err);
    } else {
      res.render("freeWrites/index");
    }
  });
});

module.exports = router;
