const { google } = require("googleapis");
const keys = require("../config/keys");

module.exports = async (req, res) => {
  const data = {
    title: req.body.title,
    description: req.body.description,
    startTime: `${req.body.date.split("T")[0]}T${
      req.body.startTime.split("T")[1]
    }`,
    endTime: `${req.body.date.split("T")[0]}T${req.body.endTime.split("T")[1]}`,
  };
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
    summary: data.title,
    description: data.description,
    start: {
      dateTime: data.startTime,
      timeZone: "America/New_York",
    },
    end: {
      dateTime: data.endTime,
      timeZone: "America/New_York",
    },
  };
  try {
    const eventResponse = await calendar.events.list({
      calendarId: "primary",
      timeMin: event.start.dateTime,
      timeMax: event.end.dateTime,
      timeZone: event.start.timeZone,
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });
    const conflictingEvents = eventResponse.data.items;
    try {
      const createdEvent = await calendar.events.insert({
        auth: auth,
        calendarId: "primary",
        resource: event,
      });
      if (conflictingEvents.length === 0) {
        res.send(createdEvent);
      } else {
        res.send({
          error: "Potial event conflict. Please check your calendar",
          response: createdEvent,
        });
      }
    } catch (error) {
      res.send(error);
    }
  } catch (error) {
    console.log(
      `${error.response.data.error.code} ${error.response.data.error.message}`
    );
    res.send(error);
  }
};
