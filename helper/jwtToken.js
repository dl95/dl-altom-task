var config = require("../config.js");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

var generateJWT = function (user) {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: user.email,
      id: user._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    config.jwtSecret
  );
};

var passwordMatch = async function (password, hashPassword) {
  const match = await bcrypt.compare(password, hashPassword);
  if (match) {
    return true;
  }
  return false;
};
module.exports = { generateJWT, passwordMatch };
