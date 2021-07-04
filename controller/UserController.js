const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const app = express();
const mongoose = require("mongoose");
const User = require("../model/user");
const passport = require("passport");
var { generateJWT } = require("../helper/jwtToken");
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));

function signUp(req, res, next) {
  var { name, email, password } = req.body;
  var role = "user";
  if (req.originalUrl == "/api/signup-admin") {
    role = "admin";
  }
  password = bcrypt.hashSync(password, saltRounds);
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      console.log("Could not regster user");
      res.status(500).json({
        success: true,
        message: "Could not regster user",
        error: err,
      });
      throw err;
    }
    if (user) {
      console.log("user already exists");
      res.status(200).json({
        success: true,
        message: "user already exists",
      });
    } else {
      User.create(
        {
          _id: new mongoose.Types.ObjectId(),
          name: name,
          email: email,
          password: password,
          role: role,
        },
        function (err, user) {
          if (err) {
            console.log("could not insert");
            res.status(500).json({
              success: true,
              message: "user already exists",
              error: err,
            });
            throw err;
          }
          res.status(201).json({
            success: true,
            message: "successfully singup",
          });
        }
      );
    }
  });
}

function login(req, res, next) {
  var { email, password } = req.body;
  if (!email) {
    return res.status(422).json({
      errors: {
        email: "is required",
      },
    });
  }

  if (!password) {
    return res.status(422).json({
      errors: {
        password: "is required",
      },
    });
  }

  return passport.authenticate(
    "local",
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }
      // console.log(passportUser, info);
      if (passportUser) {
        const user = passportUser;
        user.token = generateJWT(passportUser);

        return res.json({ message: "login succesfully", token: user.token });
      }
      return res.status(400).send(info);
    }
  )(req, res, next);
}

function profile(req, res, next) {
  console.log(req.user);
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.status(404).json({
      success: true,
      message: "Users not found",
    });
  }
}

function getWorkers(req, res, next) {
  User.find({ role: "user" }, ["name", "email", "role"], function (err, users) {
    if (err) {
      console.log("user not found");
      res.status(404).json({
        success: true,
        message: "User name and password does not match",
      });
      throw err;
    }
    if (users && users.length > 0) {
      res.status(200).json({
        success: true,
        users: users,
      });
    } else {
      console.log("Users not found");
      res.status(404).json({
        success: true,
        message: "Users not found",
      });
    }
  });
}

exports.login = login;
exports.signUp = signUp;
exports.profile = profile;
exports.getWorkers = getWorkers;
