const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const mongoose = require("mongoose");
const keys = require("../../config/keys");
//model class
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const foundUser = await User.findById(id);
  done(null, foundUser);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: keys.GITHUB_CLIENT_ID,
      clientSecret: keys.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      const existingUser = await User.findOne({ githubId: profile.id });
      console.log(existingUser);
      if (existingUser) {
        done(null, existingUser);
      } else {
        console.log(profile);
        const newUser = await new User({
          githubId: profile.id,
          email: profile.emails[0].value,
          displayName: profile.displayName,
        }).save();
        done(null, newUser);
      }
    }
  )
);