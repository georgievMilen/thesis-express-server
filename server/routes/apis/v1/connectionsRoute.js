"use strict";

const express = require("express");
const {
  getConnections,
  sendConnectionRequest,
  updateConnection
} = require("../../../controllers/apis/connections/connectionsController");

const router = express.Router();

router.get("/getConnections", getConnections);
router.put("/updateConnection", updateConnection);
router.post("/sendConnectionRequest", sendConnectionRequest);

module.exports = router;
