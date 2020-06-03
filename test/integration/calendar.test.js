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
const googleLogin = require("./testAutomationHelper");
chai.use(chaiHttp);

// describe("Calendar Controller", async function () {
//   this.timeout(4000);
//   let loginResponse;
//   before(async () => {
//     loginResponse = await googleLogin();
//   });
//   it("successfully logs user in", async () => {
//     expect(loginResponse).to.equal(true);
//   });
// });
