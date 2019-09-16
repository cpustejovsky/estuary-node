const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const middleWare = require("../middleware/index.js");

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
  updatedUser.emailUpdates = req.body.user.emailUpdates;
  User.findByIdAndUpdate(req.user.id, updatedUser).then(() => {
    res.redirect("/user");
  });
});

router.delete("/user", (req, res) => {
  User.findByIdAndDelete(req.user.id).then(() => {
    req.flash("success", "User deleted");
    res.redirect("/");
  });
});

// INDEX ROUTES
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/about", (req, res) => {
  res.render("about");
});

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
    failureRedirect: "/login",
    failureFlash: "Invalid username or password",
    successFlash: `Howdy! Welcome back!`
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
      req.flash("error", `Oops! ${err.message}`);
      res.redirect("/register");
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
