const mongoose = require("mongoose");
const User = mongoose.model("users");
const requireLogin = require("../middleware/requireLogin");
module.exports = (app) => {
  app.put("/api/user", requireLogin, async (req, res) => {
    let updatedUser = {};
    updatedUser.firstName = req.body.firstName;
    updatedUser.lastName = req.body.lastName;
    updatedUser.email = req.body.emailAddress;
    updatedUser.emailUpdates = req.body.emailUpdates;
    try {
      await User.findByIdAndUpdate(req.user.id, updatedUser)
      res.send("success");
    } catch (error) {
      console.log("OOPS!")
      console.log(error)
    }
    console.log(req.body)

  });

  app.delete("/user", (req, res) => {
    User.findByIdAndDelete(req.user.id).then(() => {
      req.flash("success", "User deleted");
      res.redirect("/");
    });
  });
};
