require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const sessions = require("client-sessions");
const favicon = require("serve-favicon");
const flash = require("connect-flash");
const methodOverride = require("method-override");

// MODELS
const User = require("./models/user");
//ROUTES
const indexRoutes = require("./routes/index.js");
const freeWriteRoutes = require("./routes/freeWriteRoutes.js");
const notesRoutes = require("./routes/notesRoutes");
let port = (process.env.PORT = 3000);

mongoose
  .connect(process.env.TESTDATABASEURL, { useNewUrlParser: true })
  .then(() => console.log("connected to database"))
  .catch(err => console.log(`ERROR: ${err}`));

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
app.use(function(req, res, next) {
  res.locals.user = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.ownership = req.flash("ownership");
  next();
});

app.use("/", indexRoutes);
app.use("/free-writes", freeWriteRoutes);
app.use("/notes", notesRoutes);

app
  .listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  })
  .on("error", function helperFunction() {
    port += 1;
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}!`);
    });
  });
