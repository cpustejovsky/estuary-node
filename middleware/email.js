const nodemailer = require("nodemailer");
require("dotenv").config();
// async..await is not allowed in global scope, must use a wrapper
module.exports = async function emailUser(emailAddress) {
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
    to: emailAddress,
    subject: "Testing!",
    html: "<h1>Test Succeeded</h1>"
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};