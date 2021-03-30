const BASEDIR = require.main.path;

const UPDATE_REFRESH_TOKEN =
  "UPDATE user_account SET refresh_token = ? WHERE email = ?";
// USER
const INSERT_USER = "INSERT INTO user_account SET ?";
const GET_USER =
  "SELECT first_name, last_name, email FROM `user_account` WHERE email = ?";
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

module.exports = {
  BASEDIR,
  GET_USER,
  UPDATE_REFRESH_TOKEN,
  INSERT_USER,
  UDPATE_USER,
  INSERT_DETAILS,
  GET_DETAILS,
  UPDATE_USER_DETAILS,
  DEL_INTEREST_IN_RELATION,
  INSERT_INTEREST_IN_RELATION,
  GET_INTEREST_IN_RELATION,
  UPDATE_RELATIONSHIPS
};
