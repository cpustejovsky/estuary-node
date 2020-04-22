const passport = require("passport");
const User = require("../models/user");
module.exports = (app) => {
  app.get("/auth/google", (req, res)=>{
    res.send("hit the Google route")
  })
  app.get("/auth/github", (req, res)=>{
    res.send("hit the GitHub route")
  })
  //handle login logic
  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/user",
      failureRedirect: "/login",
      failureFlash: "Invalid username or password",
      successFlash: `Howdy! Welcome back!`,
    }),
    (req, res) => {
      //currently nothing?
    }
  );

  //handle register logic
  app.post("/register", (req, res) => {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
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
  app.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged out");
    res.redirect("/");
  });
};
