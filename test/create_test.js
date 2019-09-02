const assert = require("assert");
const User = require("../models/user.js");

describe("Creating records", () => {
  it("saves a user", done => {
    const joe = new User({
      username: "jbob",
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
