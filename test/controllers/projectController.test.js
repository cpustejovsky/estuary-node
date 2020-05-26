const assert = require("assert");
const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../app");
const passportStub = require("passport-stub");
const User = mongoose.model("users");
const Project = mongoose.model("projects");
chai.use(chaiHttp);
chai.should();
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
describe("Project controller", () => {
  it("POSTs to /api/projects and creates the note", async () => {
    let savedUser = await new User(newUser).save();
    await new Project(newProject(savedUser._id)).save();
    passportStub.login(savedUser);
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
    let savedUser = await new User(newUser).save();
    let savedProject = await new Project(newProject(savedUser._id)).save();
    passportStub.login(savedUser);
    let response = await chai.request(app).get("/api/projects");
    assert(response.body[0]._id.toString() === savedProject._id.toString());
  });
  it("GETs /api/projects/done and reads completed projects", async () => {
    let savedUser = await new User(newUser).save();
    let savedProject = await new Project({
      title: "Project Title",
      description: "project description",
      dueDate: new Date(),
      _user: savedUser._id,
      completed: true,
    }).save();
    passportStub.login(savedUser);
    let response = await chai.request(app).get("/api/projects/done");
    assert(response.body[0]._id.toString() === savedProject._id.toString());
  });
  it("GETs /api/projects/show/:id and reads specific project", async () => {
    let savedUser = await new User(newUser).save();
    let savedProject = await new Project(newProject(savedUser._id)).save();
    passportStub.login(savedUser);
    let response = await chai.request(app).get(`/api/projects/show/${savedProject._id}`);
    assert(response.body._id.toString() === savedProject._id.toString());
  });
  // it("PATCHs to /api/projects and updates the note", async () => {
  //   let savedUser = await new User(newUser).save();
  //   let savedProject = await new Project(newProject(savedUser._id)).save();
  //   passportStub.login(savedUser);
  //   await chai.request(app).patch("/api/projects").send({
  //     content: "Project content #2",
  //     noteId: savedProject._id,
  //   });
  //   let note = await Project.findOne({
  //     _user: savedUser._id,
  //     _id: savedProject._id,
  //   });
  //   assert(note.content === "Project content #2");
  // });

  // it("PATCHs to /api/projects/:category and updates the note's category", async () => {
  //   let savedUser = await new User(newUser).save();
  //   let savedProject = await new Project(newProject(savedUser._id)).save();
  //   passportStub.login(savedUser);
  //   await chai.request(app).patch("/api/projects/waiting").send({
  //     noteId: savedProject._id,
  //   });
  //   let note = await Project.findOne({
  //     _user: savedUser._id,
  //     _id: savedProject._id,
  //     category: "waiting",
  //   });
  //   assert(note.category === "waiting");
  // });

  // it("DELETES to /api/projects and destroys the note", async () => {
  //   let savedUser = await new User(newUser).save();
  //   let savedProject = await new Project(newProject(savedUser._id)).save();
  //   passportStub.login(savedUser);
  //   await chai.request(app).delete("/api/projects").send({
  //     noteId: savedProject._id,
  //   });
  //   let note = await Project.findOne({
  //     _user: savedUser._id,
  //     _id: savedProject._id,
  //   });
  //   assert(note === null);
  // });
});
