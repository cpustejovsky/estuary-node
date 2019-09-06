const mongoose = require("mongoose");
//assignment operator for ES6 Promises
mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect("mongodb://localhost:27017/estuary", {
    useNewUrlParser: true,
    useFindAndModify: false
  });
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", error => {
      console.warn("Warning", error);
    });
});

// done does a bit of mocha magic to add asynchronisity
beforeEach(done => {
  const { users } = mongoose.connection.collections;
  users.drop(() => {
    done();
  });
});
