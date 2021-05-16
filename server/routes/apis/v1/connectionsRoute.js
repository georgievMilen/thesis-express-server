"use strict";

const express = require("express");
const {
  getConnections,
  updateConnection
} = require("../../../controllers/apis/connections/connectionsController");

const router = express.Router();

router.get("/getConnections", getConnections);
router.put("/updateConnection", updateConnection);

module.exports = router;
