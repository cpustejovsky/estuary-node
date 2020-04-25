const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const FreeWriteChecker = require("../middleware/freeWriteChecker.js");
const User = mongoose.model("users");

module.exports = (app) => {
  app.get("/api/free-writes", requireLogin, (req, res) => {
    res.send(req.user.freeWrites);
  });

  app.post("/api/free-writes", requireLogin, async (req, res) => {
    const newFreeWrite = {
      title: req.body.title,
      content: FreeWriteChecker.noteRemover(req.body.content),
      wordCount: FreeWriteChecker.wordCount(req.body.content),
    };
    if (mongoose.Types.ObjectId.isValid(req.user.id)) {
      const foundUser = await User.findById(req.user._id);
      foundUser.freeWrites.push(newFreeWrite);
      let newNotes = FreeWriteChecker.noteChecker(req.body.content);
      for (let i = 0; i < newNotes.length; i++) {
        foundUser.notes.push({ content: newNotes[i] });
      }
      const response = await foundUser.save();
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
