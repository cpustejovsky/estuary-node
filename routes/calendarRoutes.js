const { google } = require("googleapis");
const keys = require("../config/keys");

module.exports = (app) => {
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
      console.log(`The API returned an error:\n${error}`);
      res.send(`The API returned an error:\n${error}`);
    }
  });
};
