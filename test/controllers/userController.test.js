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

describe("User controller", () => {
  it("GETS /api/user and reads the user", (done) => {
    let user = new User({
      firstName: "Charles",
      lastName: "Pustejovsky",
      email: "charles@cpustejovsky.com",
      emailUpdates: true,
    });
    user.save().then((user) => {
      passportStub.login(user);
      chai
        .request(app)
        .get("/api/user")
        .end((err, res) => {
          assert(res.body._id.toString() === user._id.toString());
          done();
        });
    });
  });
  it("PUTS to /api/user and updates the user", (done) => {
    let user = new User({
      firstName: "Charles",
      lastName: "Pustejovsky",
      email: "charles@cpustejovsky.com",
      emailUpdates: true,
    });
    user.save().then((user) => {
      passportStub.login(user);
      chai
        .request(app)
        .patch("/api/user")
        .send({
          firstName: "Charles2",
          lastName: "Pustejovsky2",
          emailUpdates: false,
        })
        .end(() => {
          User.findOne({ email: "charles@cpustejovsky.com" })
            .then((foundUser) => {
              assert(
                foundUser.firstName !== user.firstName &&
                  foundUser.lastName !== user.lastName &&
                  foundUser.emailUpdates !== user.emailUpdates
              );
              done();
            })
            .catch((err) => console.log(err));
        });
    });
  });

  it("DELETES to /api/user and destroys the user", (done) => {
    let user = new User({
      firstName: "Charles",
      lastName: "Pustejovsky",
      email: "charles@cpustejovsky.com",
      emailUpdates: true,
    });
    user.save().then((user) => {
      passportStub.login(user);
      chai
        .request(app)
        .delete(`/api/user/${user._id}`)
        .end(() => {
          User.findOne({ email: "charles@cpustejovsky.com" })
            .then((user) => {
              assert(user === null);
              done();
            })
            .catch((err) => console.log(err));
        });
    });
  });
});
