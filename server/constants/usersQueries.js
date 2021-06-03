const { USER_ACCOUNT_TABLE, GENDERS_TABLE } = require("./tables");

const INSERT_USER = `INSERT INTO ${USER_ACCOUNT_TABLE} SET ?`;

const GET_USERS_DATA =
  "SELECT " +
  USER_ACCOUNT_TABLE +
  ".id, " +
  USER_ACCOUNT_TABLE +
  ".username, " +
  USER_ACCOUNT_TABLE +
  ".email, " +
  USER_ACCOUNT_TABLE +
  ".first_name, " +
  USER_ACCOUNT_TABLE +
  ".last_name, " +
  USER_ACCOUNT_TABLE +
  ".image, " +
  GENDERS_TABLE +
  ".name AS gender, " +
  USER_ACCOUNT_TABLE +
  ".age, " +
  USER_ACCOUNT_TABLE +
  ".height, " +
  USER_ACCOUNT_TABLE +
  ".weight, " +
  USER_ACCOUNT_TABLE +
  ".hair_colour, " +
  USER_ACCOUNT_TABLE +
  ".eye_colour " +
  " FROM " +
  USER_ACCOUNT_TABLE +
  " LEFT JOIN " +
  GENDERS_TABLE +
  " ON " +
  GENDERS_TABLE +
  ".id = " +
  USER_ACCOUNT_TABLE +
  ".gender_id ";

const GET_USER_DATA = GET_USERS_DATA + ` WHERE ${USER_ACCOUNT_TABLE}.email = ?`;
const GET_USER_BY_EMAIL =
  GET_USERS_DATA + ` WHERE ${USER_ACCOUNT_TABLE}.email = ?`;
const GET_UID_BY_EMAIL =
  "SELECT id FROM " + USER_ACCOUNT_TABLE + " WHERE email = ?";
const GET_PW_BY_EMAIL = `SELECT id,password FROM ${USER_ACCOUNT_TABLE} WHERE email = ?`;
const GET_EMAIL = `SELECT email FROM ${USER_ACCOUNT_TABLE} WHERE email = ?`;
const GET_USERNAME = `SELECT username FROM ${USER_ACCOUNT_TABLE} WHERE username = ?`;
const GET_USER_BY_USERNAME =
  GET_USERS_DATA + ` WHERE ${USER_ACCOUNT_TABLE}.username = ?`;
const GET_USER_AUTH =
  " SELECT " +
  `first_name, last_name, password, refresh_token FROM ${USER_ACCOUNT_TABLE} WHERE email = ?`;
const UDPATE_USER =
  "UPDATE " +
  USER_ACCOUNT_TABLE +
  " SET first_name = ?, last_name = ?, email = ?, username = ?, " +
  " age = ?, gender_id = ?, weight = ?, height = ?, " +
  " eye_colour = ?, hair_colour = ?, image = ?  WHERE email = ?";

module.exports = {
  GET_EMAIL,
  GET_USERNAME,
  GET_UID_BY_EMAIL,
  GET_USER_BY_EMAIL,
  GET_USER_BY_USERNAME,
  GET_USER_DATA,
  INSERT_USER,
  UDPATE_USER,
  GET_USERS_DATA,
  GET_USER_AUTH,
  GET_PW_BY_EMAIL
};
