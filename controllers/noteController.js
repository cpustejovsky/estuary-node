const mongoose = require("mongoose");
const Note = mongoose.model("notes");

module.exports = {
  async findNotesByCategory(req, res) {
    const userCategoryNotes = await Note.find({
      _user: req.user.id,
      category: req.params.name,
    });
    res.send(userCategoryNotes);
  },
  async findNotesByProject(req, res) {
    const userProjectNotes = await Note.find({
      _user: req.user.id,
      _project: req.params.id,
    });
    res.send(userProjectNotes);
  },
  async createNote(req, res) {
    const newNote = new Note({
      content: req.body.content,
      _user: req.user.id,
      // tags: req.body.tags,
    });
    const response = await newNote.save();
    res.send(response);
  },
  //TODO: is this the most efficient way to do update and destroy?
  async updateNote(req, res) {
    const updatedNote = await Note.findOneAndUpdate(
      { _user: req.user.id, _id: req.body.noteId },
      { content: req.body.content },
      { new: true }
    );
    const response = await updatedNote.save();
    res.send(response);
  },
  async updateNoteCategory(req, res) {
    let category = req.params.category;
    let updatedData = {
      category: category.toLowerCase(),
    };
    let response;
    switch (category.toLowerCase()) {
      case "done":
        updatedData.completed = true;
        updatedData.completedDate = new Date();
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
  },
  async attachNoteToProject(req, res) {
    let updatedNote = await Note.findOneAndUpdate(
      { _user: req.user.id, _id: req.body.noteId },
      { _project: req.body.projectId },
      { new: true }
    );
    response = await updatedNote.save();
    res.send(response);
  },
  async deleteNote(req, res) {
    await Note.findOneAndDelete({ _user: req.user.id, _id: req.body.noteId });
    res.send({});
  },
  async fetchNoteStatistics(req, res) {
    console.log("hit controller!");
    let foundNotes = await Note.find({ _user: req.user._id });
    let stats = {
      inTray: 0,
      next: 0,
      maybe: 0,
      done: 0,
      reference: 0,
    };
    let noteStats = foundNotes.reduce((accumulator, note) => {
      switch (note.category) {
        case "in-tray":
          ++accumulator.inTray;
          break;
        case "next":
          ++accumulator.next;
          break;
        case "maybe":
          ++accumulator.maybe;
          break;
        case "done":
          ++accumulator.done;
          break;
        case "reference":
          ++accumulator.reference;
          break;
      }
      return accumulator;
    }, stats);
    console.log(noteStats);
    res.send(noteStats);
  },
};
