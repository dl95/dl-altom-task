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
          // console.log(user);
          if (!user && passwordMatch(password, user.password)) {
            return done(null, false, {
              errors: { "email or password": "is invalid" },
            });
          }
          return done(null, user);
        })
        .catch(done);
    }
  )
);
