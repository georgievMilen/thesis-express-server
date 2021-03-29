const jwt = require("jsonwebtoken");

const refreshTokenGenerate = (email) => {
  const payload = { email };
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.REFRESH_TOKEN_LIFE
  });
  return refreshToken;
};

const accessTokenGenerate = (email) => {
  const payload = { email };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.ACCESS_TOKEN_LIFE
  });
  return accessToken;
};

module.exports = { refreshTokenGenerate, accessTokenGenerate };
