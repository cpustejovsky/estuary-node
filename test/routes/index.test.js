const assert = require("assert");
const User = require("../../models/user.js");

describe("Handling User Model", () => {
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
  it("updates a user's name and age", done => {
    let updatedUser = {
      firstName: "Joseph",
      lastName: "Robert",
      age: 24
    };
    joe = new User({
      username: "testUser",
      password: "test",
      firstName: "Joe",
      lastName: "Bob",
      age: 42
    });
    joe.save().then(
      User.findByIdAndUpdate(joe._id, updatedUser).then(user => {
        assert((joe.firstName = "Joseph"));
        assert((joe.lastName = "Robert"));
        assert((joe.age = "24"));
        done();
      })
    );
  });
});
