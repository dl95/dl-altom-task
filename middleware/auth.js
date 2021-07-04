const JWT = require("jsonwebtoken");
const user = require("../model/user");
const config = require("../config");
const checkAuthorization = function (req, res, next) {
  let token = req.header("Authorization");
  if (!token) return res.status(401).send("Access Denied");
  try {
    if (token.startsWith("Bearer ")) {
      token = token.slice(6, token.length).trimLeft();
      // console.log(token);
    }
    const { email } = JWT.verify(token, config.jwtSecret);
    // console.log(email);
    user.findOne({ email }).then((user) => {
      const { email, name, role, _id } = user;
      if (!user) {
        return res.sendStatus(400);
      }
      req.user = { email, name, role, _id };
      // console.log(req.user);
      return next();
    });
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

var isAdmin = function (req, res, next) {
  if (req.user.role == "admin") {
    next();
  } else {
    return res.status(401).send("unauthrised access");
  }
};

module.exports = { checkAuthorization, isAdmin };
