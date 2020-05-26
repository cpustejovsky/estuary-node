const assert = require("assert");
const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../app");
const passportStub = require("passport-stub");
const User = mongoose.model("users");
const Note = mongoose.model("notes");
chai.use(chaiHttp);
chai.should();
passportStub.install(app);
const newUser = {
  firstName: "Charles",
  lastName: "Pustejovsky",
  email: "charles@cpustejovsky.com",
  emailUpdates: true,
};
const newNote = (id) => {
  return {
    content: "note content",
    category: "in-tray",
    _user: id,
  };
};
describe("Note controller", () => {
  it("GETs /api/notes/category/:name and reads the notes belonging", async () => {
    let savedUser = await new User(newUser).save();
    let savedNote = await new Note(newNote(savedUser._id)).save();
    passportStub.login(savedUser);
    let response = await chai.request(app).get("/api/notes/category/in-tray");
    assert(response.body[0]._id.toString() === savedNote._id.toString());
  });
  it("POSTs to /api/notes and creates the note", async () => {
    let savedUser = await new User(newUser).save();
    await new Note(newNote(savedUser._id)).save();
    passportStub.login(savedUser);
    await chai.request(app).post("/api/notes").send({
      content: "Note content #2",
      category: "in-tray",
      _user: savedUser._id,
    });
    let notes = await Note.find({ _user: savedUser._id, category: "in-tray" });
    assert(notes.length > 1);
  });
  it("PATCHs to /api/notes and updates the note", async () => {
    let savedUser = await new User(newUser).save();
    let savedNote = await new Note(newNote(savedUser._id)).save();
    passportStub.login(savedUser);
    await chai.request(app).patch("/api/notes").send({
      content: "Note content #2",
      noteId: savedNote._id
    });
    let note = await Note.findOne({ _user: savedUser._id, _id: savedNote._id });
    console.log(note)
    assert(note.content === "Note content #2");
  });
  it("DELETES to /api/notes and destroys the note", async () => {
    let savedUser = await new User(newUser).save();
    let savedNote = await new Note(newNote(savedUser._id)).save();
    passportStub.login(savedUser);
    await chai.request(app).delete("/api/notes").send({
      noteId: savedNote._id,
    });
    let note = await Note.findOne({ _user: savedUser._id, _id: savedNote._id });
    assert(note === null);
  });
});
