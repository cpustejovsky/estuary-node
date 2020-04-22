const User = require("../models/User");
const requireLogin = require("../middleware/requireLogin");
module.exports = (app) => {
  app.put("/user", requireLogin, (req, res) => {
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
