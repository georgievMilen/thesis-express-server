const { model } = require("../models/model");
const bcrypt = require("bcrypt");
const { GET_PW_BY_EMAIL, GET_EMAIL, GET_USERNAME } = require("../constants");
const { credentialIsTaken } = require("../utils/credentialIsFree");
const ApiError = require("../error/ApiError");

async function credetialsNotTaken(req, res, next) {
  const { email, username } = req.body;

  const emailTaken = await model(GET_EMAIL, email);
  const usernameTaken = await model(GET_USERNAME, username);

  if (emailTaken.length > 0)
    return next(ApiError.badRequest("Email already taken"));

  if (usernameTaken.length > 0)
    return next(ApiError.badRequest("Username already taken"));

  next();
}

function loginVerify(req, res, next) {
  const { email, password } = req.body;

  model(GET_PW_BY_EMAIL, email)
    .then(async (result) => {
      if (result.length < 1)
        return next(ApiError.badRequest("Incorrect email or password"));
      const match = await bcrypt.compare(password, result[0].password);

      if (!match) return next("Incorrect email or password");
      next();
    })
    .catch((err) => next(err));
}

module.exports = {
  credetialsNotTaken,
  loginVerify
};
