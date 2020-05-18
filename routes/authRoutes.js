const passport = require("passport");
const { google } = require("googleapis");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email", "https://www.googleapis.com/auth/calendar"],
      accessType: "offline",
      prompt: "consent",
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"), function (
    req,
    res
  ) {
    res.redirect("/");
  });

  app.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["profile", "email"] })
  );

  app.get("/auth/github/callback", passport.authenticate("github"), function (
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
  app.get(
    "/api/calendar",
    passport.authenticate("google", {
      scope: ["profile", "email", "https://www.googleapis.com/auth/calendar"],
      accessType: "offline",
      prompt: "consent",
    }),
    (req, res) => {
      console.log("hit?")
      const calendar = google.calendar({
        version: "v3", auth
      });
      calendar.events.list(
        {
          calendarId: "primary",
          timeMin: new Date().toISOString(),
          maxResults: 10,
          singleEvents: true,
          orderBy: "startTime",
        },
        (err, res) => {
          console.log("hit calendar.events.list")
          if (err) return console.log("The API returned an error: " + err);
          const events = res.data.items;
          if (events.length) {
            console.log("Upcoming 10 events:");
            events.map((event, i) => {
              const start = event.start.dateTime || event.start.date;
              res.send(`${start} - ${event.summary}`);
            });
          } else {
            console.log("No upcoming events found.");
          }
        }
      );
    }
  );
};
