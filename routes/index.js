const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const middleWare = require("../middleware/index.js");

router.get("/", (req, res) => res.render("index"));
router.get("/user", middleWare.isLoggedIn, (req, res) => res.render("user"));

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
