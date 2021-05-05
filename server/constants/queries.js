const USER_ACCOUNT_TABLE = "users";
const GENDERS_TABLE = "genders";

const INSERT_USER = `INSERT INTO ${USER_ACCOUNT_TABLE} SET ?`;

const GET_USERS_DATA = ` SELECT 
   ${USER_ACCOUNT_TABLE}.id,
   ${USER_ACCOUNT_TABLE}.username,
   ${USER_ACCOUNT_TABLE}.email,
   ${USER_ACCOUNT_TABLE}.first_name,
   ${USER_ACCOUNT_TABLE}.last_name,
   ${GENDERS_TABLE}.name AS gender,
   ${USER_ACCOUNT_TABLE}.age,
   ${USER_ACCOUNT_TABLE}.height,
   ${USER_ACCOUNT_TABLE}.weight,
   ${USER_ACCOUNT_TABLE}.hair_colour,
   ${USER_ACCOUNT_TABLE}.eye_colour 
   FROM ${USER_ACCOUNT_TABLE} 
   INNER JOIN ${GENDERS_TABLE} 
   ON ${GENDERS_TABLE}.id = ${USER_ACCOUNT_TABLE}.gender_id`;

const GET_PW_BY_EMAIL = `SELECT id,password FROM ${USER_ACCOUNT_TABLE} WHERE email = ?`;
const GET_EMAIL = `SELECT email FROM ${USER_ACCOUNT_TABLE} WHERE email = ?`;

const GET_USERNAME = `SELECT username FROM ${USER_ACCOUNT_TABLE} WHERE username = ?`;
const GET_USER_BY_EMAIL =
  GET_USERS_DATA + ` WHERE ${USER_ACCOUNT_TABLE}.email = ?`;
const GET_USER_BY_USERNAME =
  GET_USERS_DATA + ` WHERE ${USER_ACCOUNT_TABLE}.username = ?`;

const GET_USER_AUTH =
  " SELECT " +
  `first_name, last_name, password, refresh_token FROM ${USER_ACCOUNT_TABLE} WHERE email = ?`;
const UDPATE_USER =
  "UPDATE `user_account` SET first_name = ?, last_name = ? WHERE email = ?";
// DETAILS

const UPDATE_USER_DETAILS =
  "UPDATE `user_details`" +
  `SET age = ?, height = ?, weight = ?, 
   hair_colour = ?, eye_colour = ? WHERE user_account_id = ?`;
// RELATIONSHIP
const INSERT_INTEREST_IN_RELATION =
  "INSERT INTO `interested_in_relation` SET user_account_id = ?, relationship_type_id = ?";
const GET_INTEREST_IN_RELATION =
  "SELECT relationship_name, checked FROM `interested_in_relation` WHERE user_account_id = ?";
const DEL_INTEREST_IN_RELATION =
  "DELETE FROM `interested_in_relation` WHERE user_account_id = ?";
const UPDATE_RELATIONSHIPS =
  "UPDATE `interested_in_relation` " +
  "SET checked = ? WHERE user_account_id = ? AND relationship_name = ?";
// INRETEREST IN GENDER
const INSERT_UPDATE_INT_GENDER =
  " INSERT INTO interester_in_gender " + "SET ? " + "ON DUPLICATE KEY UPDATE ";

module.exports = {
  GET_EMAIL,
  GET_USERNAME,
  GET_USER_BY_EMAIL,
  GET_USER_BY_USERNAME,
  INSERT_USER,
  UDPATE_USER,
  GET_PW_BY_EMAIL,
  UPDATE_USER_DETAILS,
  DEL_INTEREST_IN_RELATION,
  INSERT_INTEREST_IN_RELATION,
  GET_INTEREST_IN_RELATION,
  UPDATE_RELATIONSHIPS,
  GET_USERS_DATA,
  GET_USER_AUTH
};
