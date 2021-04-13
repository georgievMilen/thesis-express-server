const { userModal } = require("../models/users/usersModel");
const bcrypt = require("bcrypt");
const { GET_USER_AUTH } = require("../constants");

function emailNotTaken(req, res, next) {
  const { email } = req.body;
  getUserByEmail(email, (user, error) => {
    if (error) return next(error);

    if (user.length) return next("Email already taken!");

    next();
  });
}

function usernameNotTaken(req, res, next) {
  const { username } = req.body;

  getUserByUsername(username, (user, error) => {
    if (error) return next(error);
    if (user.length) return next("Username already taken!");

    next(null, user);
  });
}

function loginVerify(req, res, next) {
  const { email, password } = req.body;

  userModal(GET_USER_AUTH, email)
    .then(async (result) => {
      if (!result.length) return next("Incorrect username or password");
      const match = await bcrypt.compare(password, result[0].password);

      if (!match) return next("Incorrect username or password");
      next();
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  usernameNotTaken,
  emailNotTaken,
  loginVerify
};
