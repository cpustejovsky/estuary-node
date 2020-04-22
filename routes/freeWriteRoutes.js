const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const FreeWriteChecker = require("../middleware/freeWriteChecker.js");
const User = require("../models/User");

module.exports = (app) => {
  app.get("/", requireLogin, (req, res) => {
    res.render("freeWrites/index");
  });

  app.get("/new", requireLogin, (req, res) => {
    res.render("freeWrites/new");
  });

  app.post("/", requireLogin, (req, res) => {
    const newFreeWrite = {
      title: req.body.freeWrite.title,
      content: FreeWriteChecker.noteRemover(req.body.freeWrite.content),
      wordCount: FreeWriteChecker.wordCount(req.body.freeWrite.content),
    };
    if (mongoose.Types.ObjectId.isValid(req.user.id)) {
      User.findById(req.user._id).then((user) => {
        user.freeWrites.push(newFreeWrite);
        let newNotes = FreeWriteChecker.noteChecker(req.body.freeWrite.content);
        for (let i = 0; i < newNotes.length; i++) {
          user.notes.push({ content: newNotes[i] });
        }
        user.save((err) => {
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

  app.delete("/:id", requireLogin, (req, res) => {
    console.log("hit the delete route!");
    console.log(req.params.id);

    for (let i = 0; i < req.user.freeWrites.length; i++) {
      let freeWriteId = req.user.freeWrites[i]._id.toString();
      if (req.params.id.toString() === freeWriteId) {
        console.log("YES match!");
        User.findById(req.user._id).then((user) => {
          user.freeWrites[i].remove();
          user.save();
        });
        res.redirect("/free-writes");
      } else {
        console.log(`NO match!`);
      }
    }
  });
};
