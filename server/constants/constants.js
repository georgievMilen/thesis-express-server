const BASEDIR = require.main.path;
const USER_ACCOUNT_TABLE = "user_account";
const USER_DETAILS_TABLE = "user_details";
const GENDERS_TABLE = "genders";
const INT_RELATION_TABLE = "interested_in_relation";

const UPDATE_REFRESH_TOKEN =
  "UPDATE user_account SET refresh_token = ? WHERE email = ?";
// USER
const INSERT_USER = "INSERT INTO user_account SET ?";
const GET_USERS_DATA =
  " SELECT " +
  ` ${USER_ACCOUNT_TABLE}.first_name,
   ${USER_ACCOUNT_TABLE}.last_name,
   ${USER_ACCOUNT_TABLE}.email,
   ${USER_DETAILS_TABLE}.age,
   ${USER_DETAILS_TABLE}.height,
   ${USER_DETAILS_TABLE}.weight,
   ${USER_DETAILS_TABLE}.hair_colour,
   ${USER_DETAILS_TABLE}.eye_colour,
   ${GENDERS_TABLE}.name AS gender` +
  " FROM " +
  USER_ACCOUNT_TABLE +
  " INNER JOIN " +
  USER_DETAILS_TABLE +
  ` ON ${USER_DETAILS_TABLE}.user_account_id = ${USER_ACCOUNT_TABLE}.email` +
  " INNER JOIN " +
  GENDERS_TABLE +
  ` ON ${GENDERS_TABLE}.id = ${USER_DETAILS_TABLE}.gender_id`;

const GET_USER_DATA = GET_USERS_DATA + ` WHERE ${USER_ACCOUNT_TABLE}.email = ?`;
const GET_USER_AUTH =
  " SELECT " +
  `first_name, last_name, password, refresh_token FROM ${USER_ACCOUNT_TABLE} WHERE email = ?`;
const UDPATE_USER =
  "UPDATE `user_account` SET first_name = ?, last_name = ? WHERE email = ?";
// DETAILS
const GET_DETAILS =
  "SELECT " +
  `user_details.age , 
   user_details.height ,
   user_details.weight ,
   user_details.hair_colour,
   user_details.eye_colour,
   genders.name AS gender` +
  " FROM `user_details` " +
  " INNER JOIN `genders` ON user_details.gender_id = genders.id " +
  ` WHERE user_details.user_account_id = ? `;
const INSERT_DETAILS = "INSERT INTO user_details SET ?";
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
  BASEDIR,
  GET_USER_DATA,
  UPDATE_REFRESH_TOKEN,
  INSERT_USER,
  UDPATE_USER,
  INSERT_DETAILS,
  GET_DETAILS,
  UPDATE_USER_DETAILS,
  DEL_INTEREST_IN_RELATION,
  INSERT_INTEREST_IN_RELATION,
  GET_INTEREST_IN_RELATION,
  UPDATE_RELATIONSHIPS,
  GET_USERS_DATA,
  GET_USER_AUTH
};
