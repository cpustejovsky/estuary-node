require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const moment = require("moment");
const sessions = require("client-sessions");
const favicon = require("serve-favicon");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const schedule = require("node-schedule");
const emailUpdate = require("./cron/emailNoteUpdate.js");
//do I need to use express sanitizer?
// const expressSanitizer = require("express-sanitizer");

// MODELS
const User = require("./models/user");

//ROUTES
const indexRoutes = require("./routes/index.js");
const freeWriteRoutes = require("./routes/freeWriteRoutes.js");
const notesRoutes = require("./routes/notesRoutes");
const emailRoutes = require("./routes/emailRoutes");

//VARIABLES AND FUNCTIONS
let PORT = process.env.PORT || 5000;
const connectionString = `mongodb+srv://cpustejovsky:${process.env.DBPASSWORD}@cluster0-otlqc.mongodb.net/test?retryWrites=true&w=majority`;
require("dotenv").config();

// //CRON JOB EMAIL USERS
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 6)];
rule.hour = 6;
rule.minute = 15;

var dailyEmailUsersNotes = schedule.scheduleJob(rule, function () {
  emailUpdate();
});

if (process.argv[2] === "test") {
  mongoose
    .connect(process.env.TESTDBURL, {
      useNewUrlParser: true,
      useFindAndModify: false
    })
    .then(() => console.log("connected to database"))
    .catch(err => {
      console.log(err);
      process.exit(1);
    });
} else {
  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useFindAndModify: false
    })
    .then(() => console.log("connected to database"))
    .catch(err => {
      console.log(
        "Most likely what happened is you didn't run node app.js test to run it locally. If you tried to run production without the mongodb credentials, you'll get an error."
      );
      console.log(err);
      process.exit(1);
    });
}

app.use(bodyParser.urlencoded({ extended: true })); // TODO: what does this mean?
app.set("view engine", "ejs");
app.use("/assets", express.static(__dirname + "/public"));
app.use(favicon(__dirname + "/public/images/favicon.ico"));
app.use(methodOverride("_method"));
app.use(flash());
// PASSPORT CONFIG
app.use(
  sessions({
    cookieName: "session",
    secret: process.env.SESSION_SECRET,
    duration: 30 * 60 * 1000, // 30 mins
    activeDuration: 5 * 60 * 1000,
    httpOnly: true, // don't let JS code access cookies
    secure: true, // only set cookies over https
    ephemeral: true // destroy cookies when the browser closes
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//setting up res.locals
app.use(function (req, res, next) {
  res.locals.time = moment().format("DD MMMM YYYY");
  res.locals.user = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.ownership = req.flash("ownership");
  next();
});

app.use("/", indexRoutes);
app.use("/free-writes", freeWriteRoutes);
app.use("/notes", notesRoutes);
app.use("/email", emailRoutes);

app
  .listen(PORT, () => {
    console.log(`Estuary listening on localhost:${PORT}`);
  })
  .on("error", function helperFunction() {
    PORT += 1;
    app.listen(PORT, () => {
      console.log(`Estuary listening on localhost:${PORT}`);
    });
  });
