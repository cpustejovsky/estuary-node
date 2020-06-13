//import user, notes, projects
const mongoose = require("mongoose");
const User = mongoose.model("users");
const mailgun = require("./mailgun");
const Note = mongoose.model("notes");
const Project = mongoose.model("projects");
const dailyEmailTemplate = require("./templates/dailyEmail.js");
const weeklyEmailTemplate = require("./templates/weeklyEmail.js");

const fetchEmailUsers = async () => await User.find({ emailUpdates: true });

module.exports = {
  async dailyEmailUpdate() {
    console.log("dailyEmailUpdate is running")
    let responseMessages = [];
    let fetchedUsers = await fetchEmailUsers();
    for (const user of fetchedUsers) {
      let inTrayNotes = await Note.find({
        category: "in-tray",
        _user: user._id,
        completed: false,
      });
      let nextActions = await Note.find({
        category: "next",
        _user: user._id,
        completed: false,
      });
      let incompleteProjects = await Project.find({
        _user: user._id,
        completed: false,
      });
      let modifiedNotes = {
        from: "Estuary <no-reply@estuaryapp.com>",
        to: user.email,
        subject: "Your Daily Update",
        html: dailyEmailTemplate(inTrayNotes, nextActions, incompleteProjects),
      };
      let response = await mailgun(modifiedNotes);
      responseMessages.push(response.message);
    }
    return responseMessages;
  },
  async weeklyEmailUpdate() {
    let responseMessages = [];
    let fetchedUsers = await fetchEmailUsers();
    for (const user of fetchedUsers) {
      let completedProjects = await Project.find({
        _user: user._id,
        completed: true,
      });
      let completedNotes = await Note.find({
        _user: user._id,
        completed: true,
      });
      let projects = completedProjects.filter(
        (project) =>
          (new Date() - project.completedDate) / 86400000 /*24hrs*/ < 8
      );
      let notes = completedNotes.filter(
        (note) => (new Date() - note.completedDate) / 86400000 /*24hrs*/ < 8
      );
      let completedItemsEmail = {
        from: "Estuary <no-reply@estuaryapp.com>",
        to: user.email,
        subject: "Your Accomplishments This Week",
        html: weeklyEmailTemplate(notes, projects),
      };
      let response = await mailgun(completedItemsEmail);
      responseMessages.push(response.message);
    }
    return responseMessages;
  },
  async testEmail() {
    let testUser = await User.findOne({
      email: "charles.pustejovsky@gmail.com",
    });
    let inTrayNotes = await Note.find({
      category: "in-tray",
      _user: testUser._id,
      completed: false,
    });
    let nextActions = await Note.find({
      category: "next",
      _user: testUser._id,
      completed: false,
    });
    let incompleteProjects = await Project.find({
      _user: testUser._id,
      completed: false,
    });
    let modifiedNotes = {
      from: "Estuary TEST <no-reply@estuaryapp.com>",
      to: testUser.email,
      subject: "Test Daily Email",
      html: dailyEmailTemplate(inTrayNotes, nextActions, incompleteProjects),
    };
    let response = await mailgun(modifiedNotes);
    return response;
  },
};
