//import user, notes, projects
const mongoose = require("mongoose");
const User = mongoose.model("users");
const mailgun = require("./mailgun");

module.exports = {
  //fetch all users with email updates as true
  async fetchEmailUsers() {
    return await User.find({ emailUpdates: true });
  },
  //email intray (daily)
  //for each user, find the notes with category intray, display them in "text", and send them off
  async emailInTrayNotes() {},
  //email next action items (daily)
  //for each user, find the notes with category intray, display them in "text", and send them off
  async emailNextActions() {},
  //email ongoing projects (weekly)
  //for each user, find uncompleted projects. display them in text, and send them off
  async emailProjects() {},
  //email completed items within a time period (weekly)
  async emailCompletedItems() {},
};
