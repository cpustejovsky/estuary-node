const mongoose = require("mongoose");
const expect = require("chai").expect;
const User = mongoose.model("users");
const Note = mongoose.model("notes");
const Project = mongoose.model("projects");
const mailer = require("../../services/email/mailer");

const newInTrayNote = (id, complete) => {
  return {
    content: "needs to be organized",
    category: "in-tray",
    _user: id,
    completed: complete ? true : false,
    completedDate: complete ? new Date() : null,
  };
};

const newNextAction = (id, complete) => {
  return {
    content: "next physical action",
    category: "next",
    _user: id,
    completed: complete ? true : false,
    completedDate: complete ? new Date() : null,
  };
};

const newProject = (id, complete) => {
  return {
    title: "Test Project",
    description: "project description",
    dueDate: new Date(),
    _user: id,
    completed: complete ? true : false,
    completedDate: complete ? new Date() : null,
  };
};

const oldCompleteNote = (id) => {
  return {
    content: "old completed note",
    category: "done",
    _user: id,
    completed: true,
    completedDate: new Date("12/18/1992"),
  };
};

const oldCompleteProject = (id) => {
  return {
    title: "old completed project",
    description: "old description",
    dueDate: new Date(),
    _user: id,
    completed: true,
    completedDate: new Date("12/18/1992"),
  };
};

let emailUsers;
before(async () => {
  emailUsers = await mailer.fetchEmailUsers();
  for (const user of emailUsers) {
    await new Note(newInTrayNote(user._id)).save();
    await new Note(newInTrayNote(user._id)).save();
    await new Note(newInTrayNote(user._id, true)).save();
    await new Note(newNextAction(user._id)).save();
    await new Note(newNextAction(user._id)).save();
    await new Note(newNextAction(user._id, true)).save();
    await new Note(oldCompleteNote(user._id)).save()

    await new Project(newProject(user._id)).save();
    await new Project(newProject(user._id, true)).save();
    await new Project(newProject(user._id, true)).save();
    await new Project(oldCompleteProject(user._id)).save();
  }
});
describe("Email Methods", async function () {
  this.timeout(4000);
  it("fetches all users with email updates as true", async () => {
    let allUsers = await User.find();
    expect(allUsers.length).to.equal(3);
    expect(emailUsers.length).to.equal(2);
  });
  it("for each user, sends the in-tray notes", async () => {
    let foundNotes = await Note.find();
    expect(foundNotes.length).to.equal(14);
    let inTrayNotes = await Note.find({ category: "in-tray" });
    expect(inTrayNotes.length).to.equal(6);
    let response = await mailer.emailInTrayNotes();
    expect(response.length).to.equal(2);
    response.forEach((message) => {
      expect(message).to.equal("Queued. Thank you.");
    });
  });
  it("for each user, sends the next-actions notes", async () => {
    let foundNotes = await Note.find();
    expect(foundNotes.length).to.equal(14);
    let nextNotes = await Note.find({ category: "next" });
    expect(nextNotes.length).to.equal(6);
    let response = await mailer.emailNextActions();
    expect(response.length).to.equal(2);
    response.forEach((message) => {
      expect(message).to.equal("Queued. Thank you.");
    });
  });
  it("for each users, sends the uncompleted Projects", async () => {
    let foundProjects = await Project.find();
    expect(foundProjects.length).to.equal(8);
    let uncompletedProjects = await Project.find({ completed: false });
    expect(uncompletedProjects.length).to.equal(2);
    let response = await mailer.emailProjects();
    expect(response.length).to.equal(2);
    response.forEach((message) => {
      expect(message).to.equal("Queued. Thank you.");
    });
  });
  it("for each users, sends the completed Projects and Notes", async () => {
    let foundNotes = await Note.find();
    expect(foundNotes.length).to.equal(14);
    let foundProjects = await Project.find();
    expect(foundProjects.length).to.equal(8);
    let completedProject = await Project.find({ completed: true });
    expect(completedProject.length).to.equal(6);
    let response = await mailer.emailCompletedItems();
    expect(response.length).to.equal(2);
    response.forEach((message) => {
      expect(message).to.equal("Queued. Thank you.");
    });
  });
});
