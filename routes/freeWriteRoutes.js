const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const FreeWriteChecker = require("../middleware/freeWriteChecker.js");
const User = mongoose.model("users");
const FreeWrite = mongoose.model("free-writes");
const Note = mongoose.model("notes");

module.exports = (app) => {
  app.get("/api/free-writes", requireLogin, async (req, res) => {
    const userFreeWrites = await FreeWrite.find({ _user: req.user.id });
    res.send(userFreeWrites);
  });

  app.post("/api/free-writes", requireLogin, async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.user.id)) {
      const newFreeWrite = new FreeWrite({
        title: req.body.title,
        content: FreeWriteChecker.noteRemover(req.body.content),
        wordCount: FreeWriteChecker.wordCount(req.body.content),
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
