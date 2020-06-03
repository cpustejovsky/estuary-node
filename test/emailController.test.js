const mongoose = require("mongoose");
const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const passportStub = require("passport-stub");
const mailgun = require("../services/email/mailgun");
const app = require("../app");
const User = mongoose.model("users");
chai.use(chaiHttp);
passportStub.install(app);
const newUser = {
  firstName: "Charles",
  lastName: "Pustejovsky",
  email: "estuaryapptest@gmail.com",
  emailUpdates: true,
};

describe("Email controller", () => {
  let savedUser;
  beforeEach(async () => {
    savedUser = await new User(newUser).save();
    passportStub.login(savedUser);
  });

  it("POSTs to /api/email and sends the email", async () => {
    const data = {
      subject: "Unit Test",
      text: "What hath God wrought?",
    };
    let response = await await chai.request(app).post("/api/email").send(data) 
    expect(response.error).to.equal(false)
    expect(response.body).to.have.property("id")
    expect(response.body).to.have.property("message")
  });
});
