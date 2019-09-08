const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const middleWare = require("../middleware/index.js");
const nodemailer = require("nodemailer");
require("dotenv").config();
//TEST EMAIL ROUTES

router.post("/email", middleWare.isLoggedIn, (req, res) => {
  console.log("hit the email route!");
  console.log(req.body.user);
  User.findById(req.body.user.id).then(user => {
    let emailAddress = user.email;
    let noteContents = "<ul>";
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
        subject: "Testing!",
        html: emailContent
      });
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      res.redirect("/user");
    }
    emailUser(emailAddress);
  });
});

// USER ROUTES

router.get("/user", middleWare.isLoggedIn, (req, res) =>
  res.render("user/index")
);

router.get("/user/edit", middleWare.isLoggedIn, (req, res) => {
  res.render("user/edit");
});

router.put("/user", middleWare.isLoggedIn, (req, res) => {
  let updatedUser = {};
  updatedUser.firstName = req.body.user.firstName;
  updatedUser.lastName = req.body.user.lastName;
  updatedUser.email = req.body.user.email;
  updatedUser.age = req.body.user.age;
  User.findByIdAndUpdate(req.user.id, updatedUser).then(() => {
    res.redirect("/user");
  });
});

router.delete("/user", middleWare.isLoggedIn, (req, res) => {
  res.send("hit the update route!");
});

// INDEX ROUTES
router.get("/", (req, res) => res.render("index"));

//show login form
router.get("/login", (req, res) => {
  res.render("login");
});
//show register form
router.get("/register", (req, res) => {
  res.render("register");
});
//handle login logic
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/user",
    failureRedirect: "/login"
  }),
  (req, res) => {
    //currently nothing?
  }
);

//handle register logic
router.post("/register", (req, res) => {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      res.redirect("/register");
      console.log(`oops! something went wrong \n ${err}`);
    }
    passport.authenticate("local")(req, res, () => {
      user.firstName = req.body.user.firstName;
      user.lastName = req.body.user.lastName;
      user.email = req.body.user.email;
      user.age = req.body.user.age;
      user.save();
      // console.log(user);
      res.redirect("/user");
    });
  });
});

//logout route and logic
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Logged out");
  res.redirect("/");
});

module.exports = router;
