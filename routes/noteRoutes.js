const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const User = require("../models/User");
const Note = mongoose.model("notes");

module.exports = (app) => {
  app.get("/api/notes", requireLogin, async (req, res) => {
    const userNotes = await Note.find({ _user: req.user.id });
    res.send(userNotes);
  });

  app.post("/api/notes", requireLogin, async (req, res) => {
    const { content } = req.body;
    const newNote = new Note({ content, _user: req.user.id });
    const response = await newNote.save();
    res.send(response);
  });

  app.delete("/api/notes", requireLogin, async (req, res) => {
    console.log("hit the delete route!");
    console.log(req.body);
    await Note.findOneAndDelete({ _user: req.user.id, _id: req.body.noteId  });
    console.log("done!")
    res.send({});
  });
};
