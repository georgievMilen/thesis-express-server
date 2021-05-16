"use strict";

const express = require("express"),
  v1ApiRoute = require("./v1/authRoute"),
  searchRoute = require("./v1/searchRoute"),
  profileRoute = require("./v1/profileRoute"),
  connectionsRoute = require("./v1/connectionsRoute"),
  posterRoute = require("./v1/posterRoute");

let router = express.Router();

router.use("/v1", v1ApiRoute);
router.use("/v1/profile", profileRoute);
router.use("/v1/search", searchRoute);
router.use("/v1/poster", posterRoute);
router.use("/v1/connections", connectionsRoute);

module.exports = router;
