const express = require("express");
const router = express.Router();
// const passport = require("passport");
// const moment = require("moment");
const middleWare = require("../middleware/index.js");
const Note = require("../schemas/noteSchema");
// const FreeWriteChecker = require("../middleware/freeWriteChecker.js");

// const User = require("../models/user");
// const FreeWrite = require("../schemas/freeWriteSchema");

router.get("/", middleWare.isLoggedIn, (req, res) => {
  res.render("notes/index");
});

router.get("/new", middleWare.isLoggedIn, (req, res) => {
  res.render("notes/new");
});

router.post("/", middleWare.isLoggedIn, (req, res) => {
  const newNote = {
    content: req.body.note.content
  };
  req.user.notes.push(newNote);
  req.user.save(err => {
    if (err) {
      console.log(`oopsy!!!! here's the error: ${err}`);
    } else {
      res.redirect("/notes");
    }
  });
});

module.exports = router;