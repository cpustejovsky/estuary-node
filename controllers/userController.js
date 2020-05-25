const mongoose = require("mongoose");
const User = mongoose.model("users");
module.exports = {
  async updateUser(req, res) {
    try {
      let updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          emailUpdates: req.body.emailUpdates,
        },
        { new: true }
      );
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
