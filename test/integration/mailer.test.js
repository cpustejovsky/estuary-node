const mongoose = require("mongoose");
const expect = require("chai").expect;
const User = mongoose.model("users");
const mailer = require("../../services/email/mailer")
const user1 = {
  firstName: "Charles",
  lastName: "Pustejovsky",
  email: "estuaryapptest@gmail.com",
  emailUpdates: true,
};
const user2 = {
  firstName: "Chas",
  lastName: "Pustejovsky",
  email: "estuaryapptest@gmail.com",
  emailUpdates: true,
};
const user3 = {
  firstName: "Chuck",
  lastName: "Pustejovsky",
  email: "estuaryapptest@gmail.com",
  emailUpdates: false,
};
beforeEach(async () => {
  await new User(user1).save();
  await new User(user2).save();
  await new User(user3).save();
});
describe("Email Methods", async () => {
  it("fetches all users with email updates as true", async () => {
    let allUsers = await User.find();
    expect(allUsers.length).to.equal(3);
    let emailUsers = await mailer.fetchEmailUsers()
    expect(emailUsers.length).to.equal(2);

  });
});
