const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const flash = require("connect-flash");
const dynoWaker = require("cpustejovsky-dyno-waker");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport/google");
const PORT = process.env.PORT || 5000;

try {
  mongoose.connect(keys.MONGODB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log("connected to database");
} catch (err) {
  console.log(err);
  process.exit(1);
}

app.use(bodyParser.json());
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
require("./routes/calendarRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/freeWriteRoutes")(app);
require("./routes/noteRoutes")(app);
require("./routes/projectRoutes")(app);

if (process.env.NODE_ENV === "production") {
  dynoWaker("life-together-calculator", "bears-and-bear-markets")
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(require("path").resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Estuary listening on localhost:${PORT}`);
});