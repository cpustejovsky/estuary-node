const express = require("express");
const router = express.Router();
const passport = require("passport");
const moment = require("moment");
const middleWare = require("../middleware/index.js");
const FreeWriteChecker = require("../middleware/freeWriteChecker.js");

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
  let newNotesArray = FreeWriteChecker.noteChecker(req.body.freeWrite.content);
  const newFreeWrite = {
    title: req.body.freeWrite.title,
    content: req.body.freeWrite.content,
    wordCount: FreeWriteChecker.wordCount(req.body.freeWrite.content)
  };
  req.user.freeWrites.push(newFreeWrite);
  console.log(newNotesArray);
  // req.user.notes.push();
  req.user.save(err => {
    if (err) {
      console.log(`oopsy!!!! here's the error: ${err}`);
    } else {
      res.redirect("/free-writes");
    }
  });
});

router.delete("/:id", middleWare.isLoggedIn, (req, res) => {
  console.log("hit the delete route!");
  console.log(req.params.id);

  for (let i = 0; i < req.user.freeWrites.length; i++) {
    let freeWriteId = req.user.freeWrites[i]._id.toString();
    if (req.params.id.toString() === freeWriteId) {
      console.log("YES match!");
      User.findById(req.user._id).then(user => {
        user.freeWrites[i].remove();
        user.save();
      });
      res.redirect("/free-writes");
    } else {
      console.log(`NO match!`);
    }
  }
});

module.exports = router;
