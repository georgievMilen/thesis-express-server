"use strict";

const express = require("express");
const {
  createPoster,
  getAllPosters,
  getMyPosters,
  sendConnectionRequest,
  deletePoster
} = require("../../../controllers/apis/posters/posterController");

const router = express.Router();

router.get("/getAllPosters", getAllPosters);
router.get("/getMyPosters", getMyPosters);
router.post("/createPoster", createPoster);
router.post("/sendConnectionRequest", sendConnectionRequest);
router.delete("/deletePoster", deletePoster);

module.exports = router;
