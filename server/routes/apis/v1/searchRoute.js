const express = require("express");
const router = express.Router();
const {
  searchForPeople
} = require("../../../controllers/apis/search/searchController");

router.get("/", searchForPeople);

module.exports = router;
