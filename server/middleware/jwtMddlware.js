const jwt = require("jsonwebtoken");
const { model } = require("../models/model");
const { updateRefreshToken } = require("../models/model");
const { refreshTokenGenerate } = require("../utils/jwtUtil");
const { UPDATE_REFRESH_TOKEN, GET_USER_AUTH } = require("../constants/");

const verifyRefreshToken = (req, res, next) => {
  const { email } = req.body;
  const refreshToken = refreshTokenGenerate(email);
  model(UPDATE_REFRESH_TOKEN, [refreshToken, email])
    .then((results) => {
      model(GET_USER_AUTH, email)
        .then((results) => {
          if (results[0].refresh_token) {
            const decoded = jwt.verify(
              results[0].refresh_token,
              process.env.REFRESH_TOKEN_SECRET
            );
            if (decoded) next();
          }
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { verifyRefreshToken };
