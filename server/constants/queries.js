const { GENDERS_TABLE } = require("./tables");

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
  DEL_INTEREST_IN_RELATION,
  INSERT_INTEREST_IN_RELATION,
  GET_INTEREST_IN_RELATION,
  UPDATE_RELATIONSHIPS
};
