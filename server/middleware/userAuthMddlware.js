const {
  getUserByEmail,
  getUserByUsername
} = require("../models/users/usersModel");
const bcrypt = require("bcrypt");

function emailNotTaken(req, res, next) {
  const { email } = req.body;
  getUserByEmail(email, (user, error) => {
    if (error) return next(error);

    if (user.length) return next("Email already taken!");

    next();
  });
}

function usernameNotTaken(req, res, next) {
  console.log(req.body);
  const { username } = req.body;
  getUserByUsername(username, (user, error) => {
    if (error) return next(error);
    if (user.length) return next("Username already taken!");

    next(null, user);
  });
}

function loginVerify(req, res, next) {
  const { email, password } = req.body;

  getUserByEmail(email, async (result, error) => {
    if (error) return next(error);

    if (!result.length) return callback(false);
    const match = await bcrypt.compare(password, result[0].password);

    if (!match) return next("Incorrect username or password");

    next();
  });
}

module.exports = {
  usernameNotTaken,
  emailNotTaken,
  loginVerify
};
