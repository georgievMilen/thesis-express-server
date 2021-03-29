const express = require("express");
const router = express.Router();
const {
  searchForPeople
} = require("../../../controllers/apis/search/searchController");

router.post("/", searchForPeople);

module.exports = router;
