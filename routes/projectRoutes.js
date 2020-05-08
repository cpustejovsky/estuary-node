const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Project = mongoose.model("projects");

module.exports = (app) => {
  app.get("/api/projects", requireLogin, async (req, res) => {
    const userProjects = await Project.find({ _user: req.user.id });
    res.send(userProjects);
  });

  app.get("/api/projects/:id", requireLogin, async (req, res) => {
    const userProject = await Project.find({
      _user: req.user.id,
      _id: req.params.id,
    });
    console.log(userProject.nextActions);
    res.send(userProject);
  });

  app.post("/api/projects", requireLogin, async (req, res) => {
    const newProject = new Project({
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags,
      dueDate: req.body.dueDate,
      remindDate: req.body.remindDate,
      _user: req.user.id,
    });
    const response = await newProject.save();
    res.send(response);
  });

  //TODO: is this the most efficient way to do update and destroy?
  app.patch("/api/projects", requireLogin, async (req, res) => {
    const updatedProject = await Project.findOneAndUpdate(
      { _user: req.user.id, _id: req.body.projectId },
      {
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        dueDate: req.body.dueDate,
        remindDate: req.body.remindDate,
      },
      { new: true }
    );
    const response = await updatedProject.save();
    res.send(response);
  });

  app.patch("/api/projects/done", requireLogin, async (req, res) => {
    //TODO: need to check and make sure that all next actions are have a completed value
    const updatedProject = await Project.findOneAndUpdate(
      { _user: req.user.id, _id: req.body.projectId },
      { completed: new Date() },
      { new: true }
    );
    const response = await updatedProject.save();
    res.send(response);
  });

  app.delete("/api/projects", requireLogin, async (req, res) => {
    await Project.findOneAndDelete({
      _user: req.user.id,
      _id: req.body.projectId,
    });
    res.send({});
  });
};
