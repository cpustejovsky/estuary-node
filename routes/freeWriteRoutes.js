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

router.delete("/:id", middleWare.isLoggedIn, (req, res) => {
  console.log("hit the delete route!");
  console.log(req.params.id);
  for (let i = 0; i < req.user.freeWrites.length; i++) {
    if (req.params.id === req.user.freeWrites._id) {
      console.log(`
      found a match!:
      ${req.params.id} should match ${req.user.freeWrites._id}
      `);
    }
  }
});

module.exports = router;
