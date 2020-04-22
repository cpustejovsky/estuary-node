const User = require("../models/user");
const middleWare = require("../middleware/index.js");
module.exports = (app) => {
  app.get("/user", middleWare.isLoggedIn, (req, res) =>
    res.render("user/index")
  );

  app.get("/user/edit", middleWare.isLoggedIn, (req, res) => {
    res.render("user/edit");
  });

  app.put("/user", middleWare.isLoggedIn, (req, res) => {
    let updatedUser = {};
    updatedUser.firstName = req.body.user.firstName;
    updatedUser.lastName = req.body.user.lastName;
    updatedUser.email = req.body.user.email;
    updatedUser.age = req.body.user.age;
    updatedUser.emailUpdates = req.body.user.emailUpdates;
    User.findByIdAndUpdate(req.user.id, updatedUser).then(() => {
      res.redirect("/user");
    });
  });

  app.delete("/user", (req, res) => {
    User.findByIdAndDelete(req.user.id).then(() => {
      req.flash("success", "User deleted");
      res.redirect("/");
    });
  });
};
