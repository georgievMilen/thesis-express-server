"use strict";

const express = require("express");
const {
  updateProfile,
  getProfileInfo
} = require("../../../controllers/apis/users/usersController");

const { uploadImage } = require("../../../middleware/uploadMddlware");

const router = express.Router();

router.get("/getProfileInfo", getProfileInfo);

router.post("/updateProfile", uploadImage, updateProfile);

module.exports = router;
