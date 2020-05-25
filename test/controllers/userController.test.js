const assert = require("assert");
const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../app");
const passportStub = require("passport-stub");
const User = mongoose.model("users");
chai.use(chaiHttp);
chai.should();
passportStub.install(app);
const newUser = {
  firstName: "Charles",
  lastName: "Pustejovsky",
  email: "charles@cpustejovsky.com",
  emailUpdates: true,
};
describe("User controller", () => {
  it("GETs /api/user and reads the user", async () => {
    let savedUser = await new User(newUser).save();
    passportStub.login(savedUser);
    let response = await chai.request(app).get("/api/user");
    assert(response.body._id.toString() === savedUser._id.toString());
  });

  it("PUTS to /api/user and updates the user", async () => {
    let savedUser = await new User(newUser).save();
    passportStub.login(savedUser);
    await chai.request(app).patch("/api/user").send({
      firstName: "Charles2",
      lastName: "Pustejovsky2",
      emailUpdates: false,
    });
    let foundUser = await User.findOne({
      email: "charles@cpustejovsky.com",
    });

    assert(
      foundUser.firstName !== savedUser.firstName &&
        foundUser.lastName !== savedUser.lastName &&
        foundUser.emailUpdates !== savedUser.emailUpdates
    );
  });

  it("DELETEs to /api/user and destroys the user", async () => {
    let savedUser = await new User(newUser).save();
    passportStub.login(savedUser);
    await chai.request(app).delete(`/api/user/${savedUser._id}`);
    let foundUser = await User.findOne({ email: "charles@cpustejovsky.com" });
    assert(foundUser === null);
  });
});
