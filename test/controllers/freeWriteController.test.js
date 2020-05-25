const assert = require("assert");
const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../app");
const passportStub = require("passport-stub");
const User = mongoose.model("users");
const FreeWrite = mongoose.model("free-writes");
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
describe("Free Write controller", () => {
  it("GETs /api/free-writes and reads the free-writes", async () => {
    let savedUser = await new User(newUser).save();
    let freeWrite = new FreeWrite({
      title: "Test Free Write",
      content: "Free write content",
      date: new Date(),
      _user: savedUser._id,
    });
    let savedFreeWrite = await freeWrite.save();
    passportStub.login(savedUser);
    let response = await chai.request(app).get("/api/free-writes");
    assert(response.body[0]._id.toString() === savedFreeWrite._id.toString());
  });
  it("POSTs to /api/free-writes and creates the free-write", async () => {
    let savedUser = await new User(newUser).save();
    let freeWrite = new FreeWrite({
      title: "Test Free Write",
      content: "Free write content",
      date: new Date(),
      _user: savedUser._id,
    });
    let savedFreeWrite = await freeWrite.save();
    passportStub.login(savedUser);
    await chai.request(app).post("/api/free-writes").send({
      title: "Test Free Write #2",
      content: "Free write content #2",
      date: new Date(),
      _user: savedUser._id,
    });
    let freeWrites = await FreeWrite.find({ _user: savedUser._id });
    assert(freeWrites.length > 1);
  });
  // it("DELETES to /api/free-write and destroys the free-write", (done) => {
  //   let user = new User(newUser);
  //   user.save().then((user) => {
  //     passportStub.login(user);
  //     chai
  //       .request(app)
  //       .delete(`/api/user/${user._id}`)
  //       .end(() => {
  //         User.findOne({ email: "charles@cpustejovsky.com" })
  //           .then((user) => {
  //             assert(user === null);
  //             done();
  //           })
  //           .catch((err) => console.log(err));
  //       });
  //   });
  // });
});
