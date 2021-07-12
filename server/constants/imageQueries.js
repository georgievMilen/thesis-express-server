const TABLE = "users";
const INSERT_IMAGE = "INSERT INTO " + TABLE + "SET ?";
const GET_IMAGE =
  "SELECT * FROM " + TABLE + "WHERE user_account_id = ? AND active = 1";
const UPDATE_IMAGE =
  "UPDATE user_photo SET active =  ? WHERE user_account_id = ?";

module.export = { GET_IMAGE, INSERT_IMAGE, UPDATE_IMAGE };
