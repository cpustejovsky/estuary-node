const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const schedule = require("node-schedule");
const emailUpdate = require("./cron/emailNoteUpdate.js");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport/google")
require("./services/passport/github")
const PORT = process.env.PORT || 5000;

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

  const app = express();

app.use(bodyParser.json());
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
