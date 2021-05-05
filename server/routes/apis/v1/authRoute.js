"use strict";

const router = require("express").Router();
const {
  createUserAction,
  loginUserAction,
  logoutUserAction
} = require("../../../controllers/apis/users/usersController");
const {
  loginVerify,
  credetialsNotTaken
} = require("../../../middleware/userAuthMddlware");
const { verifyRefreshToken } = require("../../../middleware/jwtMddlware");

router.post("/register", credetialsNotTaken, createUserAction);
router.post("/login", loginVerify, verifyRefreshToken, loginUserAction);
router.post("/logout", logoutUserAction);

module.exports = router;
