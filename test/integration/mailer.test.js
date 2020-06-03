const mongoose = require("mongoose");
const expect = require("chai").expect;
const User = mongoose.model("users");
const mailer = require("../../services/email/mailer")

describe("Email Methods", async () => {
  it("fetches all users with email updates as true", async () => {
    let allUsers = await User.find();
    expect(allUsers.length).to.equal(3);
    let emailUsers = await mailer.fetchEmailUsers()
    expect(emailUsers.length).to.equal(2);

  });
});
