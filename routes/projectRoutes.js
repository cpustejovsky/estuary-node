const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Project = mongoose.model("projects");

module.exports = (app) => {
  app.get("/api/projects", requireLogin, async (req, res) => {
    const userProjects = await Project.find({ _user: req.user.id });
    res.send(userProjects);
  });

  app.get("/api/projects/:id", requireLogin, async (req, res) => {
    const userProject = await Project.find({ _user: req.user.id, _id: req.params.id });
    res.send(userProject);
  });

  app.post("/api/projects", requireLogin, async (req, res) => {
    const newNote = new Note({
      content: req.body.content,
      _user: req.user.id,
      // tags: req.body.tags,
    });
    const response = await newNote.save();
    res.send(response);
  });
  //TODO: is this the most efficient way to do update and destroy?
  app.patch("/api/projects", requireLogin, async (req, res) => {
    const updatedNote = await Note.findOneAndUpdate(
      { _user: req.user.id, _id: req.body.projectId },
      {
        title: req.body.title,
        descriptions: req.body.descriptions,
        tags: req.body.tags,
        dueDate: req.body.dueDate,
        remindDate: req.body.remindDate,
      },
      { new: true }
    );
    const response = await updatedNote.save();
    res.send(response);
  });

  app.patch("/api/projects/done", requireLogin, async (req, res) => {
    const updatedNote = await Note.findOneAndUpdate(
      { _user: req.user.id, _id: req.body.projectId },
      {
        completed: new Date(),
        $set: { "nextActions.$.completed": new Date() },
      },
      { new: true }
    );
    const response = await updatedNote.save();
    res.send(response);
  });

  app.delete("/api/projects", requireLogin, async (req, res) => {
    await Note.findOneAndDelete({
      _user: req.user.id,
      _id: req.body.projectId,
    });
    res.send({});
  });
};
