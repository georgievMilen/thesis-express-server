const { GENDERS_TABLE, POSTER_GENDER_TABLE } = require("./tables");

const GET_GENDER_ID = "SELECT id FROM " + GENDERS_TABLE + " WHERE name = ? ";
const GET_ALL_PG =
  "SELECT " +
  POSTER_GENDER_TABLE +
  ".poster_id, " +
  GENDERS_TABLE +
  ".name FROM " +
  POSTER_GENDER_TABLE +
  " LEFT JOIN " +
  GENDERS_TABLE +
  " ON " +
  GENDERS_TABLE +
  ".id = " +
  POSTER_GENDER_TABLE +
  ".gender_id";
const INSERT_POSTER_GENDER =
  "INSERT INTO " + POSTER_GENDER_TABLE + " SET poster_id = ?, gender_id = ?";

module.exports = { GET_GENDER_ID, INSERT_POSTER_GENDER, GET_ALL_PG };
