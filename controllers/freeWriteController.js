const mongoose = require("mongoose");
const FreeWriteChecker = require("../middleware/freeWriteChecker.js");
const User = mongoose.model("users");
const FreeWrite = mongoose.model("free-writes");
const Note = mongoose.model("notes");

module.exports = {
  async fetchFreeWrites(req, res) {
    const userFreeWrites = await FreeWrite.find({ _user: req.user.id });
    res.send(userFreeWrites);
  },
  async createFreeWrite(req, res) {
    if (mongoose.Types.ObjectId.isValid(req.user.id)) {
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
      const response = await newFreeWrite.save();
      res.send(response);
    } else {
      console.log("Please provide correct Id");
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
      res.send(error)
    }

  },
};
