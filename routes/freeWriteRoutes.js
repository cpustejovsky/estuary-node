const fs = require("fs");
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer({ dest: "temp/" });
const express = require("express");
const router = express.Router();
const middleWare = require("../middleware/index.js");
const FreeWriteChecker = require("../middleware/freeWriteChecker.js");
const User = require("../models/user");

router.get("/", middleWare.isLoggedIn, (req, res) => {
  res.render("freeWrites/index");
});

router.get("/new", middleWare.isLoggedIn, (req, res) => {
  res.render("freeWrites/new");
});

router.get("/upload", (req, res) => {
  res.render("freeWrites/upload");
});

router.post("/", middleWare.isLoggedIn, (req, res) => {
  const newFreeWrite = {
    title: req.body.freeWrite.title,
    content: FreeWriteChecker.noteRemover(req.body.freeWrite.content),
    wordCount: FreeWriteChecker.wordCount(req.body.freeWrite.content)
  };
  if (mongoose.Types.ObjectId.isValid(req.user.id)) {
    User.findById(req.user._id).then(user => {
      user.freeWrites.push(newFreeWrite);
      let newNotes = FreeWriteChecker.noteChecker(req.body.freeWrite.content);
      for (let i = 0; i < newNotes.length; i++) {
        user.notes.push({ content: newNotes[i] });
      }
      user.save(err => {
        if (err) {
          console.log(`oopsy!!!! here's the error: ${err}`);
        } else {
          res.redirect("/free-writes");
        }
      });
    });
  } else {
    console.log("Please provide correct Id");
  }
});

router.post(
  "/upload",
  upload.single("testFile"),
  middleWare.isLoggedIn,
  (req, res) => {
    const newFreeWrite = {
      title: req.body.freeWrite.title,
      content: FreeWriteChecker.noteRemover(
        fs.readFileSync(req.file.path, "utf8")
      ),
      wordCount: FreeWriteChecker.wordCount(
        fs.readFileSync(req.file.path, "utf8")
      )
    };
    if (mongoose.Types.ObjectId.isValid(req.user.id)) {
      User.findById(req.user._id).then(user => {
        user.freeWrites.push(newFreeWrite);
        let newNotes = FreeWriteChecker.noteChecker(
          fs.readFileSync(req.file.path, "utf8")
        );
        for (let i = 0; i < newNotes.length; i++) {
          user.notes.push({ content: newNotes[i] });
        }
        fs.unlinkSync(req.file.path);
        user.save(err => {
          if (err) {
            console.log(`oopsy!!!! here's the error: ${err}`);
          } else {
            res.redirect("/free-writes");
          }
        });
      });
    } else {
      fs.unlinkSync(req.file.path);
      console.log("Please provide correct Id");
    }
  }
);

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
