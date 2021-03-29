const jwt = require("jsonwebtoken");
const { userModal } = require("../models/users/usersModel");
const { updateRefreshToken } = require("../models/users/usersModel");
const { refreshTokenGenerate } = require("../utils/jwtUtil");
const { UPDATE_REFRESH_TOKEN, EMAIL_QUERY } = require("../constants/constants");

const verifyRefreshToken = (req, res, next) => {
  const { email } = req.body;
  userModal(EMAIL_QUERY, email)
    .then((results) => {
      const decoded = jwt.verify(
        results[0].refresh_token,
        process.env.REFRESH_TOKEN_SECRET
      );
      if (decoded) next();
      const refreshToken = refreshTokenGenerate(email);
      userModal(UPDATE_REFRESH_TOKEN, [refreshToken, email])
        .then((results) => {
          next();
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
