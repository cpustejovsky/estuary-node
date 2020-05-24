const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const User = mongoose.model("users");

describe("User controller", () => {
  it("PUTS to /api/user and updates the user", (done) => {
    let user = new User({
      firstName: "Charles",
      lastName: "Pustejovsky",
      email: "charles@cpustejovsky.com",
      emailUpdates: true,
    });
    user.save().then(() => {
      request(app)
        .put("/api/user")
        .send({
          firstName: "Charles2",
          lastName: "Pustejovsky2",
          email: "charles@cpustejovsky.com",
          emailUpdates: false,
        })
        .end((err, res) => {
          User.findOne({
            email: "charles@cpustejovsky.com",
          }).then((foundUser) => {
            assert(user.firstName !== foundUser.firstName);
            done();
          });
        });
    });
  });
});
