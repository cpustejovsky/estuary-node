const mongoose = require("mongoose");
const expect = require("chai").expect;
const User = mongoose.model("users");
const Note = mongoose.model("notes");
const mailer = require("../../services/email/mailer");

const newInTrayNote = (id) => {
  return {
    content: "note content",
    category: "in-tray",
    _user: id,
  };
};

const newNextAction = (id) => {
  return {
    content: "note content",
    category: "next",
    _user: id,
  };
};
let emailUsers;
before(async () => {
  emailUsers = await mailer.fetchEmailUsers();
  for (const user of emailUsers) {
    await new Note(newInTrayNote(user._id)).save();
    await new Note(newInTrayNote(user._id)).save();
    await new Note(newNextAction(user._id)).save();
    await new Note(newNextAction(user._id)).save();
  }
});
describe("Email Methods", async () => {
  it("fetches all users with email updates as true", async () => {
    let allUsers = await User.find();
    expect(allUsers.length).to.equal(3);
    expect(emailUsers.length).to.equal(2);
  });
  it("for each user, finds the in-tray notes", async () => {
    let foundNotes = await Note.find();
    expect(foundNotes.length).to.equal(8);
    await mailer.emailInTrayNotes()
  });
});
