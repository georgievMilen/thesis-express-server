"use strict";

const express = require("express"),
  homeController = require("../controllers/homeController");

const router = express.Router();

router.use("/", homeController);

module.exports = router;
