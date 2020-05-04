const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Note = mongoose.model("notes");

module.exports = (app) => {
  app.get("/api/notes", requireLogin, async (req, res) => {
    const userNotes = await Note.find({ _user: req.user.id });
    res.send(userNotes);
  });

  app.post("/api/notes", requireLogin, async (req, res) => {
    const newNote = new Note({
      content: req.body.content,
      _user: req.user.id,
      // tags: req.body.tags,
    });
    const response = await newNote.save();
    res.send(response);
  });
  //TODO: is this the most efficient way to do update and destroy?
  //await axios.put("/api/notes", {noteId: "5ea6e09ea4e289a7a45e36e3",content: "updated content again!"})
  app.patch("/api/notes", requireLogin, async (req, res) => {
    const updatedNote = await Note.findOneAndUpdate(
      { _user: req.user.id, _id: req.body.noteId },
      { content: req.body.content },
      { new: true }
    );
    const response = await updatedNote.save();
    res.send(response);
  });

  app.patch("/api/notes/:category", requireLogin, async (req, res) => {
    console.log(req.params.category.toLowerCase());
    const updatedNote = await Note.findOneAndUpdate(
      { _user: req.user.id, _id: req.body.noteId },
      {
        category: req.params.category.toLowerCase(),
        content: "Testing to see if this route is working?",
      },
      { new: true }
    );
    const response = await updatedNote.save();
    console.log(response);
    res.send(response);
  });

  //await axios.delete("/api/notes", {data: {noteId: "5ea6ef50cd05a4c7d4a5e3f8"}})
  app.delete("/api/notes", requireLogin, async (req, res) => {
    await Note.findOneAndDelete({ _user: req.user.id, _id: req.body.noteId });
    res.send({});
  });
};
