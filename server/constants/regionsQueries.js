const { REGIONS_TABLE, POSTER_REGION_TABLE } = require("./tables");
const GET_COUNTRY =
  "SELECT id FROM " + REGIONS_TABLE + " WHERE country = ? AND city = ?";

const GET_ALL_PR =
  "SELECT " +
  POSTER_REGION_TABLE +
  ".poster_id, " +
  REGIONS_TABLE +
  ".country, " +
  REGIONS_TABLE +
  ".city FROM " +
  POSTER_REGION_TABLE +
  " LEFT JOIN " +
  REGIONS_TABLE +
  " ON " +
  POSTER_REGION_TABLE +
  ".region_id = " +
  REGIONS_TABLE +
  ".id";
const INSERT_POSTER_REGION =
  "INSERT INTO " + POSTER_REGION_TABLE + " SET poster_id = ?, region_id = ?";

module.exports = { GET_COUNTRY, INSERT_POSTER_REGION, GET_ALL_PR };
