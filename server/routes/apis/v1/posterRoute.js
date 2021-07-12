"use strict";

const express = require("express");
const router = express.Router();

const {
  createPoster,
  getAllPosters,
  getMyPosters,
  deletePoster
} = require("../../../controllers/apis/posters/posterController");

const { uploadImage } = require("../../../middleware/uploadMddlware");

router.get("/getAllPosters", getAllPosters);
router.get("/getMyPosters", getMyPosters);
router.post("/createPoster", uploadImage, createPoster);
router.delete("/deletePoster", deletePoster);

module.exports = router;
