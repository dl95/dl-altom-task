const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const user = require("../model/user");
const { passwordMatch } = require("../helper/jwtToken");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      user
        .findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              errors: { message: "User does not exits" },
            });
          }
          if (user && !passwordMatch(password, user.password)) {
            return done(null, false, {
              errors: { "email or password": "is invalid" },
            });
          }
        })
        .catch(done);
    }
  )
);
