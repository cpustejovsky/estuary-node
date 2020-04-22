const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const moment = require("moment");
const cookieSession = require("cookie-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const schedule = require("node-schedule");
const emailUpdate = require("./cron/emailNoteUpdate.js");
const keys = require("./config/keys");
require("./services/passport")

//do I need to use express sanitizer?
// const expressSanitizer = require("express-sanitizer");

// MODELS
const User = require("./models/User");

//VARIABLES AND FUNCTIONS
let PORT = process.env.PORT || 5000;

// //CRON JOB EMAIL USERS
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 6)];
rule.hour = 6;
rule.minute = 15;

var dailyEmailUsersNotes = schedule.scheduleJob(rule, function () {
  emailUpdate();
});

mongoose
  .connect(keys.MONGODB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"))
  .catch((err) => {
    console.log(
      "Most likely what happened is you didn't run node app.js test to run it locally. If you tried to run production without the mongodb credentials, you'll get an error."
    );
    console.log(err);
    process.exit(1);
  });

app.use(bodyParser.urlencoded({ extended: true })); // TODO: what does this mean?
app.use(methodOverride("_method"));
app.use(flash());
// PASSPORT CONFIG
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    keys: [keys.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/freeWriteRoutes")(app);
require("./routes/noteRoutes")(app);

if (process.env.NODE_ENV === "production") {
  //serve up production assets
  app.use(express.static("client/build"));
  //serve up html routes if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Estuary listening on localhost:${PORT}`));
