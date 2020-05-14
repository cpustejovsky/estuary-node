const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Project = mongoose.model("projects");
const Note = mongoose.model("notes");

module.exports = (app) => {
  app.get("/api/projects", requireLogin, async (req, res) => {
    const userProjects = await Project.find({
      _user: req.user.id,
      completed: false,
    });
    res.send(userProjects);
  });
  app.get("/api/projects/done", requireLogin, async (req, res) => {
    const userProjects = await Project.find({
      _user: req.user.id,
      completed: true,
    });
    console.log(userProjects);
    res.send(userProjects);
  });

  app.get("/api/projects/show/:id", requireLogin, async (req, res) => {
    const userProject = await Project.find({
      _user: req.user.id,
      _id: req.params.id,
    });
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
    const uncompletedNotes = await Note.update(
      { _user: req.user.id, _project: req.body.projectId, completed: false },
    );
    console.log(uncompletedNotes)
    res.send(uncompletedNotes)
    // if(uncompletedNotes)
    // const updatedProject = await Project.findOneAndUpdate(
    //   { _user: req.user.id, _id: req.body.projectId },
    //   { completed: new Date() },
    //   { new: true }
    // );

    // const response = await updatedProject.save();
    // res.send(response);
  });

  app.delete("/api/projects/:id", requireLogin, async (req, res) => {
    await Project.findOneAndDelete({
      _user: req.user.id,
      _id: req.params.id,
    });
    res.send(req.params.id);
  });
};
