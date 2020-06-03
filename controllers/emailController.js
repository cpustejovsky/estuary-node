const mongoose = require("mongoose");
const User = mongoose.model("users");
const mailgun = require("../services/mailgun")
module.exports = {
  async sendEmail(req, res) {
    let user = await User.findById(req.user._id)
    let data = {
      from: "Estuary Test <no-reply@estuaryapp.com>",
      to: user.email,
      subject: req.body.subject,
      text: req.body.text,
    }
    try {
      let response = await mailgun(data)
      res.send(response)
    } catch (error) {
      console.log("OOPS!");
      console.log(error);
      res.send(error);
    }
  },
};
