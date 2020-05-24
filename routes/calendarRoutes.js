const calendarController = require("../controllers/calendarController");

module.exports = (app) => {
  app.post("/api/calendar", calendarController);
};
