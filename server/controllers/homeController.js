"use strict";

const express = require("express"),
  homeService = require("../models/home/homeService");

const router = express.Router();

router.get("/", homeService.getInfo);

module.exports = router;
