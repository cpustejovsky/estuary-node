const mongoose = require("mongoose");
//assignment operator for ES6 Promises
mongoose.Promise = global.Promise;
const User = mongoose.model("users");

const users = [
  {
    firstName: "Charles",
    lastName: "Pustejovsky",
    email: "estuaryapptest@gmail.com",
    emailUpdates: true,
  },
  {
    firstName: "Chas",
    lastName: "Pustejovsky",
    email: "estuaryapptest@gmail.com",
    emailUpdates: true,
  },
  {
    firstName: "Chuck",
    lastName: "Pustejovsky",
    email: "estuaryapptest@gmail.com",
    emailUpdates: false,
  },
];

const newInTrayNote = (id) => {
  return {
    content: "note content",
    category: "in-tray",
    _user: id,
  };
};

const newNextAction = (id) => {
  return {
    content: "note content",
    category: "next",
    _user: id,
  };
};

before(async () => {
  mongoose.connect("mongodb://localhost:27017/estuary", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  await mongoose.connection.on("error", (error) => {
    console.warn("Warning", error);
  });
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.drop();
  }
  for (let user of users) {
    await new User(user).save();
  }
});
