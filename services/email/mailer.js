//import user, notes, projects
const mongoose = require("mongoose");
const User = mongoose.model("users");
const mailgun = require("./mailgun");
const Note = mongoose.model("notes");

module.exports = {
  async fetchEmailUsers() {
    return await User.find({ emailUpdates: true });
  },
  async emailInTrayNotes() {
    let responseMessages = [];
    let fetchedUsers = await this.fetchEmailUsers();
    for (const user of fetchedUsers) {
      let userInTrayNotes = await Note.find({
        category: "in-tray",
        _user: user._id,
      });
      let modifiedNotes = {
        from: "Estuary <no-reply@estuaryapp.com>",
        to: user.email,
        subject: "You Have Notes to Organize",
        text: userInTrayNotes.map((note) => note.content),
      };
      let response = await mailgun(modifiedNotes);
      responseMessages.push(response.message);
    }
    return responseMessages;
  },
  //email next action items (daily)
  //for each user, find the notes with category intray, display them in "text", and send them off
  async emailNextActions() {
    let responseMessages = [];
    let fetchedUsers = await this.fetchEmailUsers();
    for (const user of fetchedUsers) {
      let userInTrayNotes = await Note.find({
        category: "next",
        _user: user._id,
      });
      let modifiedNotes = {
        from: "Estuary <no-reply@estuaryapp.com>",
        to: user.email,
        subject: "You Have Next Actions to Complete",
        text: userInTrayNotes.map((note) => note.content),
      };
      let response = await mailgun(modifiedNotes);
      responseMessages.push(response.message);
    }
    return responseMessages;
  },
  //email ongoing projects (weekly)
  //for each user, find uncompleted projects. display them in text, and send them off
  async emailProjects() {},
  //email completed items within a time period (weekly)
  async emailCompletedItems() {},
};
