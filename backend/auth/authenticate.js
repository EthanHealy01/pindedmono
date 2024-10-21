const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const hasher = require("./hasher");
const userProfile = require("../user_profile/schema");

let tokenHeaderKey = config.get("tokenHeaderKey");
let jwtSecretKey = config.get("jwtSecretKey");

module.exports = function (req, res) {
  // TODO confirm user details

  const { email, password } = req.body;
  hasher(password).then((hash) => {
    userProfile.find({ email }).then((user) => {
      if (user.length == 0) {
        res.status(401).send("Username does not exist");
      } else if (user.length == 1) {
        if (user[0].password) {
          bcrypt.compare(password, user[0].password).then((response) => {
            if (response) {
              let data = {
                time: Date(),
                userId: user[0]._id.toString(),
              };
              const token = jwt.sign(data, jwtSecretKey);
              res.send({ token, user });
            } else {
              res.status(401).send("incorrect password");
            }
          });
        } else {
          res.status(500).send("Invalid user selected");
        }
      } else {
        //TODO this should never happen
        res.status(500).send("Unexpected error");
      }
    });
  });
};
