const mongoose = require("mongoose");
const User = mongoose.model("users");
module.exports = {
  async updateUser(req, res) {
    let updatedUser = {};
    updatedUser.firstName = req.body.firstName;
    updatedUser.lastName = req.body.lastName;
    updatedUser.email = req.body.emailAddress;
    updatedUser.emailUpdates = req.body.emailUpdates;
    try {
      await User.findByIdAndUpdate(req.user.id, updatedUser, { new: true });
      res.send(updatedUser);
    } catch (error) {
      console.log("OOPS!");
      console.log(error);
    }
  },
  async deleteUser(req, res) {
    await User.findByIdAndDelete(req.user.id);
    req.flash("success", "User deleted");
    res.redirect("/");
  },
};
