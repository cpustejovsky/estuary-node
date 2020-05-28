const assert = require("assert");
const mongoose = require("mongoose");
const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const app = require("../../app");
const passportStub = require("passport-stub");
const User = mongoose.model("users");
const Project = mongoose.model("projects");
const Note = mongoose.model("notes");
chai.use(chaiHttp);
passportStub.install(app);
const newUser = {
  firstName: "Charles",
  lastName: "Pustejovsky",
  email: "charles@cpustejovsky.com",
  emailUpdates: true,
};
const newProject = (id) => {
  return {
    title: "Project Title",
    description: "project description",
    dueDate: new Date(),
    _user: id,
  };
};
const newNote = (id) => {
  return {
    content: "note content",
    category: "in-tray",
    _user: id,
  };
};
describe("Project controller", () => {
  let savedUser;
  let savedProject;
  beforeEach(async () => {
    savedUser = await new User(newUser).save();
    savedProject = await new Project(newProject(savedUser._id)).save();
    passportStub.login(savedUser);
  });
  it("POSTs to /api/projects and creates the project", async () => {
    await chai.request(app).post("/api/projects").send({
      title: "Project Title #2",
      description: "project description #2",
      dueDate: new Date(),
      _user: savedUser._id,
    });
    let projects = await Project.find({ _user: savedUser._id });
    assert(projects.length > 1);
  });
  it("GETs /api/projects and reads uncompleted projects", async () => {
    let response = await chai.request(app).get("/api/projects");
    assert(response.body[0]._id.toString() === savedProject._id.toString());
  });
  it("GETs /api/projects/done and reads completed projects", async () => {
    let savedProject = await new Project({
      title: "Project Title",
      description: "project description",
      dueDate: new Date(),
      _user: savedUser._id,
      completed: true,
    }).save();
    let response = await chai.request(app).get("/api/projects/done");
    assert(response.body[0]._id.toString() === savedProject._id.toString());
  });
  it("GETs /api/projects/show/:id and reads specific project", async () => {
    let response = await chai
      .request(app)
      .get(`/api/projects/show/${savedProject._id}`);
    assert(response.body._id.toString() === savedProject._id.toString());
  });
  it("PATCHs to /api/projects and updates the project", async () => {
    await chai.request(app).patch("/api/projects").send({
      description: "Project description #2",
      projectId: savedProject._id,
    });
    let project = await Project.findOne({
      _user: savedUser._id,
      _id: savedProject._id,
    });
    assert(project.description === "Project description #2");
  });

  it("PATCHs to /api/projects/done and marks the project as complete", async () => {
    await chai.request(app).patch("/api/projects/done").send({
      projectId: savedProject._id,
    });
    let project = await Project.findOne({
      _user: savedUser._id,
      _id: savedProject._id,
    });
    assert(project.completed === true);
  });

  it("PATCHs to /api/projects/done and returns error if project has uncompleted notes", async () => {
    let savedNote = await new Note(newNote(savedUser._id)).save();
    await chai
      .request(app)
      .patch("/api/notes/project")
      .send({ noteId: savedNote._id, projectId: savedProject._id });
    let res = await chai.request(app).patch("/api/projects/done").send({
      projectId: savedProject._id,
    });
    let project = await Project.findOne({
      _user: savedUser._id,
      _id: savedProject._id,
    });
    assert(
      res.text === "Error! There are notes that still need to be completed!"
    );
    assert(project.completed === false);
  });

  it("DELETES to /api/projects and destroys the project", async () => {
    await chai.request(app).delete(`/api/projects/${savedProject._id}`);
    let project = await Project.findOne({
      _user: savedUser._id,
      _id: savedProject._id,
    });
    assert(project === null);
  });
});
