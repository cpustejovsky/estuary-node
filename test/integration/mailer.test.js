const mongoose = require("mongoose");
const expect = require("chai").expect;
const User = mongoose.model("users");
const Note = mongoose.model("notes");
const mailer = require("../../services/email/mailer");

const newInTrayNote = (id, complete) => {
  return {
    content: "needs to be organized",
    category: "in-tray",
    _user: id,
    complete: complete ? true : false,
  };
};

const newNextAction = (id, complete) => {
  return {
    content: "next physical action",
    category: "next",
    _user: id,
    complete: complete ? true : false,
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
    expect(foundNotes.length).to.equal(12);
    let inTrayNotes = await Note.find({ category: "in-tray" });
    expect(inTrayNotes.length).to.equal(6);
    let response = await mailer.emailInTrayNotes();
    expect(response.length).to.equal(2);
    response.forEach((message) => {
      expect(message).to.equal("Queued. Thank you.");
    });
  });
  it("for each user, finds the next-actions notes", async () => {
    let foundNotes = await Note.find();
    expect(foundNotes.length).to.equal(12);
    let nextNotes = await Note.find({ category: "next" });
    expect(nextNotes.length).to.equal(6);
    let response = await mailer.emailNextActions();
    expect(response.length).to.equal(2);
    response.forEach((message) => {
      expect(message).to.equal("Queued. Thank you.");
    });
  });
});
