const jwt = require("jsonwebtoken");
const { modal } = require("../models/users/usersModel");
const { updateRefreshToken } = require("../models/users/usersModel");
const { refreshTokenGenerate } = require("../utils/jwtUtil");
const { UPDATE_REFRESH_TOKEN, GET_USER_AUTH } = require("../constants/");

const verifyRefreshToken = (req, res, next) => {
  const { email } = req.body;
  const refreshToken = refreshTokenGenerate(email);
  modal(UPDATE_REFRESH_TOKEN, [refreshToken, email])
    .then((results) => {
      modal(GET_USER_AUTH, email)
        .then((results) => {
          if (results[0].refresh_token) {
            const decoded = jwt.verify(
              results[0].refresh_token,
              process.env.REFRESH_TOKEN_SECRET
            );
            if (decoded) next();
            console.log(decoded);
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
