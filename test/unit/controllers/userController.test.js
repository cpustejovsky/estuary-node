const mongoose = require("mongoose");
const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const app = require("../../../app");
const passportStub = require("passport-stub");
const User = mongoose.model("users");
chai.use(chaiHttp);
passportStub.install(app);
const newUser = {
  firstName: "Charles",
  lastName: "Pustejovsky",
  email: "charles@cpustejovsky.com",
  emailUpdates: true,
};

describe("User controller", () => {
  let savedUser;
  
  beforeEach(async() => {
    savedUser = await new User(newUser).save();
    passportStub.login(savedUser);
  });

  it("GETs /api/user and reads the user", async () => {
    let response = await chai.request(app).get("/api/user");
    expect(response.body._id.toString()).to.equal(savedUser._id.toString());
  });

  it("PATCHs to /api/user and updates the user", async () => {
    await chai.request(app).patch("/api/user").send({
      firstName: "Charles2",
      lastName: "Pustejovsky2",
      emailUpdates: false,
    });
    let foundUser = await User.findOne({
      email: "charles@cpustejovsky.com",
    });
    expect(foundUser.firstName).to.not.equal(savedUser.firstName);
    expect(foundUser.lastName).to.not.equal(savedUser.lastName);
    expect(foundUser.emailUpdates).to.not.equal(savedUser.emailUpdates);
  });

  it("DELETEs to /api/user and destroys the user", async () => {
    await chai.request(app).delete(`/api/user/${savedUser._id}`);
    expect(await User.findOne({ email: "charles@cpustejovsky.com" })).to.equal(
      null
    );
  });
});
