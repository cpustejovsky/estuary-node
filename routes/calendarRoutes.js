const { google } = require("googleapis");
const keys = require("../config/keys");

module.exports = (app) => {
  app.post("/api/calendar", async (req, res) => {
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
    var event = {
      summary: req.body.title || "Title Goes Here",
      location: req.body.location,
      description: req.body.description || "Description Goes Here",
      start: {
        dateTime: req.body.startDate || new Date(),
        timeZone: "America/New_York",
      },
      end: {
        dateTime: req.body.endDate || new Date(),
        timeZone: "America/New_York",
      },
    };
    try {
      const createdEvent = await calendar.events.insert({
        auth: auth,
        calendarId: "primary",
        resource: event,
      });
      res.send(createdEvent);
    } catch (error) {
      res.send(error);
    }
  });
};
