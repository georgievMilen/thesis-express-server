const {
  CHAT_TABLE,
  CONNECTIONS_TABLE,
  USER_ACCOUNT_TABLE,
  DIR_CONN_TABLE
} = require("./tables");
const GET_MESSAGES =
  ` SELECT ${CHAT_TABLE}.id AS message_id, ${CHAT_TABLE}.user_id, ` +
  ` ${CHAT_TABLE}.text, ${CHAT_TABLE}.ts, ${USER_ACCOUNT_TABLE}.email, ` +
  ` ${USER_ACCOUNT_TABLE}.first_name AS firstName, ${USER_ACCOUNT_TABLE}.last_name AS lastName` +
  ` FROM ${CONNECTIONS_TABLE} ` +
  ` LEFT JOIN ${CHAT_TABLE} ON ${CHAT_TABLE}.connection_id = ${CONNECTIONS_TABLE}.id ` +
  ` INNER JOIN ${USER_ACCOUNT_TABLE} ON ${USER_ACCOUNT_TABLE}.id = ${CHAT_TABLE}.user_id ` +
  ` WHERE ${CONNECTIONS_TABLE}.id = ? ` +
  ` ORDER BY ${CHAT_TABLE}.ts ASC`;

const GET_DIR_MESSAGES =
  ` SELECT ${CHAT_TABLE}.id AS message_id, ${CHAT_TABLE}.user_id, ` +
  ` ${CHAT_TABLE}.text, ${CHAT_TABLE}.ts, ${USER_ACCOUNT_TABLE}.email, ` +
  ` ${USER_ACCOUNT_TABLE}.first_name AS firstName, ${USER_ACCOUNT_TABLE}.last_name AS lastName` +
  ` FROM ${DIR_CONN_TABLE} ` +
  ` LEFT JOIN ${CHAT_TABLE} ON ${CHAT_TABLE}.connection_id = ${DIR_CONN_TABLE}.id ` +
  ` INNER JOIN ${USER_ACCOUNT_TABLE} ON ${USER_ACCOUNT_TABLE}.id = ${CHAT_TABLE}.user_id ` +
  ` WHERE ${DIR_CONN_TABLE}.id = ? ` +
  ` ORDER BY ${CHAT_TABLE}.ts ASC`;

const POST_MESSAGE = ` INSERT INTO ${CHAT_TABLE} SET connection_id = ?, text = ?, user_id = ?`;
module.exports = { GET_MESSAGES, POST_MESSAGE, GET_DIR_MESSAGES };
