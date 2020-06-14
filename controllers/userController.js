const mongoose = require("mongoose");
const User = mongoose.model("users");
module.exports = {
  async fetchUser(req, res) {
    try {
      let foundUser = await User.findOne({ _id: req.user.id });
      res.send(foundUser);
    } catch (error) {
      console.log("OOPS!");
      console.log(error);
      res.send(error);
    }
  },
  async updateUser(req, res) {
    try {
      let updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          emailUpdates: req.body.emailUpdates,
          advancedView: req.body.advancedView,
        },
        { new: true }
      );
      res.send(updatedUser);
    } catch (error) {
      console.log("OOPS!");
      console.log(error);
      res.send(error);
    }
  },
  async deleteUser(req, res) {
    await User.findByIdAndDelete({ _id: req.params.id });
    //TODO: replace flash with something in React
    res.send({});
  },
};
