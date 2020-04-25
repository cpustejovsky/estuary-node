// const passport = require("passport");
// const moment = require("moment");
const requireLogin = require("../middleware/requireLogin");
const User = require("../models/User");
const Note = require("../schemas/noteSchema");
// const FreeWriteChecker = require("../middleware/freeWriteChecker.js");

// const User = require("../models/user");
// const FreeWrite = require("../schemas/freeWriteSchema");
module.exports = (app) => {
  app.get("/api/notes", requireLogin, async (req, res) => {
    console.log(req.user.notes)
    res.send(req.user.notes)
  });

  app.post("/api/notes", requireLogin, async (req, res) => {
    console.log(req.body.content)
    const newNote = {
      content: req.body.content,
    };
    req.user.notes.push(newNote);
    const response = await req.user.save()
    console.log(response)
    res.send(response);
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
