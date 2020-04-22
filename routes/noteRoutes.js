// const passport = require("passport");
// const moment = require("moment");
const requireLogin = require("../middleware/requireLogin");
const User = require("../models/User");
const Note = require("../schemas/noteSchema");
// const FreeWriteChecker = require("../middleware/freeWriteChecker.js");

// const User = require("../models/user");
// const FreeWrite = require("../schemas/freeWriteSchema");
module.exports = (app) => {
  app.post("/api/notes", requireLogin, (req, res) => {
    const newNote = {
      content: req.body.note.content,
    };
    req.user.notes.push(newNote);
    req.user.save((err) => {
      if (err) {
        console.log(`oopsy!!!! here's the error: ${err}`);
      } else {
        res.redirect("/notes");
      }
    });
  });

  app.delete("/api/notes:id", requireLogin, (req, res) => {
    console.log("hit the delete route!");
    for (let i = 0; i < req.user.notes.length; i++) {
      let notesId = req.user.notes[i]._id.toString();
      if (req.params.id.toString() === notesId) {
        console.log("YES match!");
        User.findById(req.user._id.toString()).then((user) => {
          user.notes[i].remove();
          user.save();
        });
        res.redirect("/notes");
      } else {
        console.log(`NO match!`);
      }
    }
  });
};
