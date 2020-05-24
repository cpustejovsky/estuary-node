const mongoose = require("mongoose");
const Project = mongoose.model("projects");
const Note = mongoose.model("notes");

module.exports = {
  async getProjects(req, res) {
    const userProjects = await Project.find({
      _user: req.user.id,
      completed: false,
    });
    res.send(userProjects);
  },
  async getCompletedProjects(req, res) {
    const userProjects = await Project.find({
      _user: req.user.id,
      completed: true,
    });
    res.send(userProjects);
  },
  async getProject(req, res) {
    const userProject = await Project.find({
      _user: req.user.id,
      _id: req.params.id,
    });
    res.send(userProject);
  },
  async createProject(req, res) {
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
  },
  async updateProject(req, res) {
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
  },
  async markProjectComplete(req, res) {
    const uncompletedNotes = await Note.find({
      _user: req.user.id,
      _project: req.body.projectId,
      completed: false,
    });
    if (uncompletedNotes.length === 0) {
      const updatedProject = await Project.findOneAndUpdate(
        { _user: req.user.id, _id: req.body.projectId },
        { completedDate: new Date(), completed: true },
        { new: true }
      );

      const response = await updatedProject.save();
      res.send(response);
    } else {
      res.send("Error! There are notes that still need to be completed!");
    }
  },
  async deleteProject(req, res) {
    await Project.findOneAndDelete({
      _user: req.user.id,
      _id: req.params.id,
    });
    res.send(req.params.id);
  },
};
