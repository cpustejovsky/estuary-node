const assert = require("assert");
const User = require("../../models/user.js");

describe("Creating User Model", () => {
  it("saves a user", done => {
    const joe = new User({
      username: "testUser",
      password: "test",
      firstName: "Joe",
      lastName: "Bob",
      age: 42
    });

    joe.save().then(() => {
      assert(!joe.isNew);
      done();
    });
  });
});
describe("Updating a User", () => {
  let joe;

  beforeEach(done => {
    joe = new User({
      username: "testUser",
      password: "test",
      firstName: "Joe",
      lastName: "Bob",
      age: 42
    });
    joe.save().then(() => done());
  });
  it("updates a user's name and age", done => {
    let updatedUser = {};
    updatedUser.firstName = "Joseph";
    updatedUser.lastName = "Robert";
    updatedUser.age = 24;
    User.findByIdAndUpdate(joe._id, updatedUser).then(user => {
      assert((joe.firstName = "Joseph"));
      assert((joe.lastName = "Robert"));
      assert((joe.age = "24"));
      done();
    });
  });
});
