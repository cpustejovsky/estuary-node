const assert = require("assert");
const User = require("../../models/user.js");

describe("Handling User Model", () => {
  // it("saves a user", done => {
  //   const joe = new User({
  //     username: "testUser",
  //     password: "test",
  //     firstName: "Joe",
  //     lastName: "Bob",
  //     age: 42
  //   });

  //   joe.save().then(() => {
  //     assert(!joe.isNew);
  //     done();
  //   });
  // });
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
  it("adds 2 and 2", done => {
    function addTwoNums(x, y) {
      return x + y;
    }
    let addedNum = addTwoNums(2, 2);

    assert(addedNum === 4);
    done();
  });
});
