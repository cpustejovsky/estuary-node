const mongoose = require("mongoose");
const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const app = require("../../../app");
const passportStub = require("passport-stub");
const User = mongoose.model("users");
const FreeWrite = mongoose.model("free-writes");
const Note = mongoose.model("notes");
chai.use(chaiHttp);
passportStub.install(app);

const fs = require("fs").promises;
const path = require("path");
const readFile = async (file) => {
  try {
    return await fs.readFile(path.resolve(__dirname, file), "utf8");
  } catch (error) {
    console.log(error);
  }
};

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
    expect(freeWrites.length).to.be.gt(1);
  });
  it("returns empty object when it fails to POST to /api/free-writes", async () => {
    let res = await chai.request(app).post("/api/free-writes").send({
      foo: "bar",
      hello: "world"
    });
    expect((res.body)).to.be.an("object").that.is.empty
  });
  it("DELETES to /api/free-write and destroys the free-write", async () => {
    let res = await chai
      .request(app)
      .delete(`/api/free-writes/${savedFreeWrite._id}`);
    let foundFreeWrite = await FreeWrite.findOne({
      _user: savedUser._id,
      _id: savedFreeWrite._id,
    });
    expect(foundFreeWrite).to.equal(null);
  });
  it("Receive CastError when wrong value is sent as id param", async () => {
    let res = await chai
      .request(app)
      .delete(`/api/free-writes/wrongvalue`);
    expect(res.body.name).to.equal("CastError");
  });
  it("saves notes from free write", async () => {
    const testFreeWrite = await readFile("../middleware/test.txt");
    let foundNotes = await Note.find({})
    expect(foundNotes.length).to.equal(0)
    await chai.request(app).post("/api/free-writes").send({
      title: "Test Free Write #2",
      content: testFreeWrite,
      date: new Date(),
      _user: savedUser._id,
    });
    foundNotes = await Note.find({})
    expect(foundNotes.length).to.equal(2)
  });
});
