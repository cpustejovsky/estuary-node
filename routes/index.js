const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const middleWare = require("../middleware/index.js");

router.get("/", (req, res) => res.render("index"));
router.get("/secret", middleWare.isLoggedIn, (req, res) =>
   res.render("secret")
);

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
      successRedirect: "/secret",
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
         res.redirect("/secret");
         console.log("successfully registered!");
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
