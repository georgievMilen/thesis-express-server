"use strict";

const express = require("express");
const {
  getConnections
} = require("../../../controllers/apis/connections/connectionsController");

const router = express.Router();

router.get("/getConnections", getConnections);

module.exports = router;
