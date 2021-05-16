const { model } = require("../models/model");
const bcrypt = require("bcrypt");
const { GET_PW_BY_EMAIL, GET_EMAIL, GET_USERNAME } = require("../constants");
const { credentialIsTaken } = require("../utils/credentialIsFree");

async function credetialsNotTaken(req, res, next) {
  const { email, username } = req.body;

  const result = [];

  result.push(await credentialIsTaken(GET_EMAIL, email));
  result.push(await credentialIsTaken(GET_USERNAME, username));
  result.forEach((element) => {
    if (element) return next(element);
  });
  next();
}

function loginVerify(req, res, next) {
  const { email, password } = req.body;

  model(GET_PW_BY_EMAIL, email)
    .then(async (result) => {
      if (!result.length) return next("Incorrect email or password");
      const match = await bcrypt.compare(password, result[0].password);

      if (!match) return next("Incorrect email or password");
      next();
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  credetialsNotTaken,
  loginVerify
};
