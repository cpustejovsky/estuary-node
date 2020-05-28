const mongoose = require("mongoose");
const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const app = require("../../app");
const passportStub = require("passport-stub");
const User = mongoose.model("users");
const FreeWrite = mongoose.model("free-writes");
chai.use(chaiHttp);
passportStub.install(app);

const newUser = {
  firstName: "Charles",
  lastName: "Pustejovsky",
  email: "charles@cpustejovsky.com",
  emailUpdates: true,
};
const newFreeWrite = (id) => {
  return {
    title: "Test Free Write",
    content: "Free write content",
    date: new Date(),
    _user: id,
  };
};
describe("Free Write controller", () => {
  let savedUser;
  let savedFreeWrite;
  beforeEach(async () => {
    savedUser = await new User(newUser).save();
    savedFreeWrite = await new FreeWrite(newFreeWrite(savedUser._id)).save();
    passportStub.login(savedUser);
  });
  it("GETs /api/free-writes and reads the free-writes", async () => {
    let response = await chai.request(app).get("/api/free-writes");
    expect(response.body[0]._id.toString()).to.equal(
      savedFreeWrite._id.toString()
    );
  });
  it("POSTs to /api/free-writes and creates the free-write", async () => {
    await chai.request(app).post("/api/free-writes").send({
      title: "Test Free Write #2",
      content: "Free write content #2",
      date: new Date(),
      _user: savedUser._id,
    });
    let freeWrites = await FreeWrite.find({ _user: savedUser._id });
    expect(freeWrites.length).to.be.gt(1)
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
