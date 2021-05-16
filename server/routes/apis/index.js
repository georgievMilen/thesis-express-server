"use strict";

const express = require("express"),
  v1ApiRoute = require("./v1/authRoute"),
  searchRoute = require("./v1/searchRoute"),
  profileRoute = require("./v1/profileRoute"),
  posterRoute = require("./v1/posterRoute");

let router = express.Router();

router.use("/v1", v1ApiRoute);
router.use("/v1/profile", profileRoute);
router.use("/v1/search", searchRoute);
router.use("/v1/poster", posterRoute);

module.exports = router;
