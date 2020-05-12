const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Note = mongoose.model("notes");
const Project = mongoose.model("projects");
module.exports = (app) => {
  app.get("/api/notes", requireLogin, async (req, res) => {
    const userNotes = await Note.find({ _user: req.user.id });
    res.send(userNotes);
  });

  app.get("/api/notes/project/:projectId", requireLogin, async (req, res) => {
    const userProjectNotes = await Note.find({
      _user: req.user.id,
      _project: req.params.projectId,
    });
    res.send(userProjectNotes);
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

  app.patch("/api/notes/project", requireLogin, async (req, res) => {
    let updatedNote = await Note.findOneAndUpdate(
      { _user: req.user.id, _id: req.body.noteId },
      { _project: req.body.projectId, category: "project" },
      { new: true }
    );
    response = await updatedNote.save();
    res.send(response);
  });

  app.patch("/api/notes/:category", requireLogin, async (req, res) => {
    let category = req.params.category;
    let updatedData = {
      category: category.toLowerCase(),
    };
    let response;
    switch (category.toLowerCase()) {
      case "done":
        updatedData.completed = new Date();
        break;
      case "waiting":
        updatedData.dependsOn = req.body.dependsOn || null;
        break;
      default:
        break;
    }
    let updatedNote = await Note.findOneAndUpdate(
      { _user: req.user.id, _id: req.body.noteId },
      updatedData,
      { new: true }
    );
    response = await updatedNote.save();
    res.send(response);
  });

  //await axios.delete("/api/notes", {data: {noteId: "5ea6ef50cd05a4c7d4a5e3f8"}})
  app.delete("/api/notes", requireLogin, async (req, res) => {
    await Note.findOneAndDelete({ _user: req.user.id, _id: req.body.noteId });
    res.send({});
  });
};
