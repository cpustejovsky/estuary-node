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
    content: req.body.freeWrite.content,
    wordCount: 42
  };
  req.user.freeWrites.push(newFreeWrite);
  req.user.save(err => {
    if (err) {
      console.log(`oopsy!!!! here's the error: ${err}`);
    } else {
      res.render("freeWrites/index");
    }
  });
});

router.delete("/:id", middleWare.isLoggedIn, (req, res) => {
  console.log("hit the delete route!");
  console.log(req.params.id);

  for (let i = 0; i < req.user.freeWrites.length; i++) {
    if (req.params.id.toString() === req.user.freeWrites[i]._id.toString()) {
      User.findById(req.user._id).then(user => {
        user.freeWrites[i].remove();
        user.save();
      });
      res.redirect("/free-writes");
    } else {
      console.log(`
      Not a match!
      req.params.id is ${req.params.id} and its type is ${typeof req.params.id} 
      req.user.freeWritees[${i}]._id is ${
        req.user.freeWrites[i]._id
      } and its type is ${typeof req.user.freeWrites[i]._id} 
      `);
    }
  }
});

module.exports = router;
