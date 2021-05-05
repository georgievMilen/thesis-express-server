const BASEDIR = require.main.path;
const USER_ACCOUNT_TABLE = "users";

const UPDATE_REFRESH_TOKEN = `UPDATE ${USER_ACCOUNT_TABLE} SET refresh_token = ? WHERE email = ?`;

module.exports = {
  BASEDIR,
  UPDATE_REFRESH_TOKEN
};
