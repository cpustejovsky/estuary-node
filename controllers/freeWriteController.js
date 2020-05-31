const mongoose = require("mongoose");
const FreeWriteChecker = require("../middleware/freeWriteChecker.js");
const FreeWrite = mongoose.model("free-writes");
const Note = mongoose.model("notes");

module.exports = {
  async fetchFreeWrites(req, res) {
    res.send(await FreeWrite.find({ _user: req.user.id }));
  },
  async createFreeWrite(req, res) {
    try {
      const newFreeWrite = new FreeWrite({
        title: req.body.title,
        content: FreeWriteChecker.noteRemover(req.body.content),
        wordCount: FreeWriteChecker.wordCount(req.body.content),
        date: new Date(),
        _user: req.user.id,
      });
      let newNotes = FreeWriteChecker.noteChecker(req.body.content);
      for (let i = 0; i < newNotes.length; i++) {
        await new Note({ content: newNotes[i], _user: req.user.id }).save();
      }
      try {
        const response = await newFreeWrite.save();
        res.send(response);
      } catch (error) {
        res.send(error);
      }
    } catch (error) {
      res.send(error);
    }
  },
  async deleteFreeWrite(req, res) {
    try {
      await FreeWrite.findOneAndDelete({
        _user: req.user.id,
        _id: req.params.id,
      });
      res.send(req.param.id);
    } catch (error) {
      res.send(error);
    }
  },
};
