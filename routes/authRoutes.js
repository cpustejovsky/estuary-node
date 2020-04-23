const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get("/auth/google/callback", passport.authenticate("google"), function (
    req,
    res
  ) {
    // Successful authentication, redirect home.
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });


  app.get("/auth/github", (req, res) => {
    res.send(
      "hit the GitHub route; currently unavailable. Email charles.pustejovsky@mgail.com and tell him to get his butt in gear if this is still the case past April 2020."
    );
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
