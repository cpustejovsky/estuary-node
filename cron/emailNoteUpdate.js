const nodemailer = require("nodemailer");
//TODO: add keys
const User = require("../models/User");

module.exports = function() {
  User.find({ emailUpdates: true }).then(users => {
    for (let i = 0; i < users.length; i++) {
      console.log(`found user! Here is their username \n ${users[i].username}`);
      User.findOne({ username: users[i].username }).then(user => {
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
              pass: process.env.EMAIL_PW
            }
          });
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"NodeJS Application" donotreply@estuary.com',
            to: emailAddr,
            subject: `${user.firstName} ${user.lastName}'s Notes`,
            html: emailContent
          });
        }
        emailUser(emailAddress);
      });
    }
  });
};
