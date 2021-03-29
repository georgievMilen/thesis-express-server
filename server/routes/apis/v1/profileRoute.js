"use strict";

const express = require("express");
const {
  updateProfile,
  getProfileInfo
} = require("../../../controllers/apis/users/usersController");
const {
  uploadFile,
  getUploadedFile
} = require("../../../controllers/apis/uploads/uploadController");
const {
  uploadFileToDisk,
  imageAlreadyUploaded,
  updateImageIsActive
} = require("../../../middleware/uploadMddlware");
const router = express.Router();

router.post(
  "/upload/:id",
  uploadFileToDisk.single("image"),
  imageAlreadyUploaded,
  updateImageIsActive,
  uploadFile
);
router.get("/upload/:id", getUploadedFile);

router.get("/getProfileInfo", getProfileInfo);

router.post("/updateProfile", updateProfile);

module.exports = router;
