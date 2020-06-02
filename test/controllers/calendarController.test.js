// const { google } = require("googleapis");
// const keys = require("../../config/keys");

const mongoose = require("mongoose");
const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const app = require("../../app");
const User = mongoose.model("users");
const FreeWrite = mongoose.model("free-writes");
const Note = mongoose.model("notes");
const googleLogin = require("../testAutomationHelper");
chai.use(chaiHttp);

describe("Calendar Controller", function () {
  this.timeout(5000);
  it("successfully logs a user in", async () => {
    const response = await googleLogin();
    expect(response).to.equal(true);
  });
});
