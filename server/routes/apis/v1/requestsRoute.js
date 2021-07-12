"use strict";

const express = require("express");
const {
  getRequests,
  sendConnectionRequest,
  updateDirRequest,
  updatePostRequest,
  sendDirConnReq
} = require("../../../controllers/apis/requests/requestsController");

const router = express.Router();

router.get("/getRequests", getRequests);
router.put("/updateDirRequest", updateDirRequest);
router.put("/updatePostRequest", updatePostRequest);
router.post("/sendConnectionRequest", sendConnectionRequest);
router.post("/sendDirConnReq", sendDirConnReq);

module.exports = router;
