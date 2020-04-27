const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const User = require("../models/User");
const Note = mongoose.model("notes")

module.exports = (app) => {
  app.get("/api/notes", requireLogin, async (req, res) => {
    const userNotes = await Note.find({ _user: req.user.id });
    res.send(userNotes);
  });

  app.post("/api/notes", requireLogin, async (req, res) => {
    const { content } = req.body;
    const newNote = new Note({ content, _user: req.user.id });
    const response = await newNote.save();
    res.send(response)
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
