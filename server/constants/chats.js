const {
  CHAT_TABLE,
  CONNECTIONS_TABLE,
  USER_ACCOUNT_TABLE
} = require("./tables");
const GET_MESSAGES =
  ` SELECT ${CHAT_TABLE}.id AS message_id, ${CHAT_TABLE}.user_id, ` +
  ` ${CHAT_TABLE}.text, ${CHAT_TABLE}.ts, ${USER_ACCOUNT_TABLE}.email, ` +
  ` ${USER_ACCOUNT_TABLE}.first_name, ${USER_ACCOUNT_TABLE}.last_name ` +
  ` FROM ${CONNECTIONS_TABLE} ` +
  ` LEFT JOIN ${CHAT_TABLE} ON ${CHAT_TABLE}.connection_id = ${CONNECTIONS_TABLE}.id ` +
  ` INNER JOIN ${USER_ACCOUNT_TABLE} ON ${USER_ACCOUNT_TABLE}.id = ${CHAT_TABLE}.user_id ` +
  ` WHERE ${CONNECTIONS_TABLE}.id = ?`;

module.exports = { GET_MESSAGES };
