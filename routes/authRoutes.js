const passport = require("passport");
const { google } = require("googleapis");
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email", "https://www.googleapis.com/auth/calendar"],
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"), function (
    req,
    res
  ) {
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/calendar", async (req, res) => {
    const auth = new google.auth.OAuth2(
      keys.GOOGLE_CLIENT_ID,
      keys.GOOGLE_CLIENT_SECRET,
      `/auth/google/callback`
    );
    auth.credentials = { access_token: req.user.accessToken };
    const calendar = google.calendar({
      version: "v3",
      auth,
    });
    try {
      const events = await calendar.events.list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      });
      res.send(events);
    } catch (error) {
      console.log(`The API returned an error:\n${err}`);
      res.send(`The API returned an error:\n${err}`);
    }
  });
};
