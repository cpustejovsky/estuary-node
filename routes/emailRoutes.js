const User = require("../models/user");
const middleWare = require("../middleware/index.js");
const nodemailer = require("nodemailer");
require("dotenv").config();

//EMAIL ROUTES
module.exports = (app) => {
  app.post("/api/email", middleWare.isLoggedIn, (req, res) => {
    console.log("hit the email route!");
    console.log(req.body.user);
    User.findById(req.body.user.id).then((user) => {
      let emailAddress = user.email;
      let noteContents = "<h1>Your Notes</h1>\n<ul>";
      for (let i = 0; i < user.notes.length; i++) {
        noteContents += `\n<li>${user.notes[i].content}</li>`;
        if (user.notes[i] === user.notes.length - 1) {
          noteContents += "</ul>";
        }
      }
      let emailContent = noteContents;
      async function emailUser(emailAddr) {
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PW,
          },
        });
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"NodeJS Application" donotreply@estuary.com',
          to: emailAddr,
          subject: `${user.firstName} ${user.lastName}'s Notes`,
          html: emailContent,
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.redirect("/user");
      }
      emailUser(emailAddress);
    });
  });
};
