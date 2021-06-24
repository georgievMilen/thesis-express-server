const {
  CONNECTIONS_TABLE,
  USER_ACCOUNT_TABLE,
  POSTERS_TABLE,
  DIR_CONN_TABLE
} = require("./tables");

const CREATE_CONNECTION =
  "INSERT INTO " + CONNECTIONS_TABLE + " SET poster_id = ?, user_id = ?";

const CREATE_DIR_CONN =
  "INSERT INTO " + DIR_CONN_TABLE + " SET sender_id = ?, receiver_id = ?";

const UPDATE_DIR_REQ = ` UPDATE ${DIR_CONN_TABLE} SET response = ? WHERE id = ?`;
const UPDATE_POST_REQ = ` UPDATE ${CONNECTIONS_TABLE} SET response = ? WHERE id = ?`;

const GET_REQUEST_IDS =
  `SELECT ${CONNECTIONS_TABLE}.id AS connection_id, ${CONNECTIONS_TABLE}.poster_id, ` +
  `  ${CONNECTIONS_TABLE}.response, ` +
  ` ${POSTERS_TABLE}.title, ${POSTERS_TABLE}.image AS poster_image ` +
  ` FROM ${USER_ACCOUNT_TABLE} ` +
  ` RIGHT JOIN ${POSTERS_TABLE} ON ${USER_ACCOUNT_TABLE}.id = ${POSTERS_TABLE}.user_id ` +
  ` RIGHT JOIN ${CONNECTIONS_TABLE} ON ${CONNECTIONS_TABLE}.poster_id = ${POSTERS_TABLE}.id ` +
  ` WHERE ${USER_ACCOUNT_TABLE}.email = ? `;

const GET_REQUESTS_WUSER =
  `SELECT ${CONNECTIONS_TABLE}.id as connection_id, ` +
  ` ${USER_ACCOUNT_TABLE}.id AS user_id, ${USER_ACCOUNT_TABLE}.first_name, ` +
  ` ${USER_ACCOUNT_TABLE}.last_name, ${USER_ACCOUNT_TABLE}.email ` +
  ` FROM ${CONNECTIONS_TABLE} ` +
  ` INNER JOIN ${USER_ACCOUNT_TABLE} ` +
  ` ON ${USER_ACCOUNT_TABLE}.id = ${CONNECTIONS_TABLE}.user_id ` +
  ` WHERE ${CONNECTIONS_TABLE}.id = ?`;

const GET_SEND_P_CONN =
  ` SELECT ${CONNECTIONS_TABLE}.id as connectionId, ` +
  ` ${CONNECTIONS_TABLE}.response, ` +
  ` ${POSTERS_TABLE}.image AS posterImage,  ` +
  ` ${POSTERS_TABLE}.title AS posterTitle,  ` +
  ` ${POSTERS_TABLE}.text AS posterText, ` +
  ` poster_owner.id AS userId, ` +
  ` poster_owner.first_name AS firstName,  ` +
  ` poster_owner.last_name AS lastName, ` +
  ` poster_owner.email AS email, ` +
  ` poster_owner.image AS userImage, ` +
  ` poster_owner.age, ` +
  ` poster_owner.height, ` +
  ` poster_owner.weight, ` +
  ` poster_owner.hair_colour AS hairColour, ` +
  ` poster_owner.eye_colour AS eyeColour, ` +
  ` poster_owner.about ` +
  ` FROM ${USER_ACCOUNT_TABLE} ` +
  ` LEFT JOIN ${CONNECTIONS_TABLE} ON ${CONNECTIONS_TABLE}.user_id = ${USER_ACCOUNT_TABLE}.id ` +
  ` INNER JOIN ${POSTERS_TABLE} ON ${CONNECTIONS_TABLE}.poster_id = ${POSTERS_TABLE}.id ` +
  ` INNER JOIN ${USER_ACCOUNT_TABLE} as poster_owner ON ${POSTERS_TABLE}.user_id = poster_owner.id ` +
  ` WHERE ${CONNECTIONS_TABLE}.response = ? AND ${USER_ACCOUNT_TABLE}.id = ?`;

const GET_REC_P_CONN =
  ` SELECT ${CONNECTIONS_TABLE}.id AS connectionId, ` +
  `  ${CONNECTIONS_TABLE}.response, ` +
  `  ${POSTERS_TABLE}.image AS posterImage, ` +
  `  ${POSTERS_TABLE}.title AS posterTitle, ` +
  `  ${POSTERS_TABLE}.text AS posterText, ` +
  `  sender.id AS userId, ` +
  `  sender.first_name AS firstName, ` +
  `  sender.last_name AS lastName, ` +
  `  sender.email AS email, ` +
  `  sender.image AS userImage, ` +
  ` sender.age, ` +
  ` sender.height, ` +
  ` sender.weight, ` +
  ` sender.hair_colour AS hairColour, ` +
  ` sender.eye_colour AS eyeColour, ` +
  ` sender.about ` +
  `FROM ${USER_ACCOUNT_TABLE}` +
  ` RIGHT JOIN ${POSTERS_TABLE} ON ${POSTERS_TABLE}.user_id = users.id ` +
  ` INNER JOIN ${CONNECTIONS_TABLE} ON ${CONNECTIONS_TABLE}.poster_id = ${POSTERS_TABLE}.id ` +
  ` INNER JOIN ${USER_ACCOUNT_TABLE} AS sender ON ${CONNECTIONS_TABLE}.user_id = sender.id ` +
  ` WHERE ${CONNECTIONS_TABLE}.response = ? AND ${USER_ACCOUNT_TABLE}.id = ? `;

const GET_SEND_DIR_CONN =
  ` SELECT ${DIR_CONN_TABLE}.id AS connectionId, ` +
  ` ${DIR_CONN_TABLE}.response, ` +
  ` user.id AS userId, ` +
  ` user.image AS userImage, ` +
  ` user.first_name AS firstName, ` +
  ` user.last_name AS lastName, ` +
  ` user.email, ` +
  ` user.age, ` +
  ` user.height, ` +
  ` user.weight, ` +
  ` user.hair_colour AS hairColour, ` +
  ` user.eye_colour AS eyeColour, ` +
  ` user.about ` +
  ` FROM ${USER_ACCOUNT_TABLE} ` +
  ` RIGHT JOIN ${DIR_CONN_TABLE} ON ${USER_ACCOUNT_TABLE}.id = ${DIR_CONN_TABLE}.sender_id ` +
  ` INNER JOIN ${USER_ACCOUNT_TABLE} AS user ` +
  ` ON ${DIR_CONN_TABLE}.receiver_id = user.id ` +
  ` WHERE ${DIR_CONN_TABLE}.response = ? AND ${USER_ACCOUNT_TABLE}.id = ? `;

const GET_REC_DIR_CONN =
  ` SELECT ${DIR_CONN_TABLE}.id AS connectionId, ` +
  ` ${DIR_CONN_TABLE}.response, ` +
  ` user.id AS userId, ` +
  ` user.image AS userImage, ` +
  ` user.first_name AS firstName, ` +
  ` user.last_name AS lastName, ` +
  ` user.email, ` +
  ` user.age , ` +
  ` user.height, ` +
  ` user.weight, ` +
  ` user.hair_colour AS hairColour, ` +
  ` user.eye_colour AS eyeColour, ` +
  ` user.about ` +
  ` FROM ` +
  ` ${USER_ACCOUNT_TABLE} ` +
  ` RIGHT JOIN ${DIR_CONN_TABLE} ON ${USER_ACCOUNT_TABLE}.id = ${DIR_CONN_TABLE}.receiver_id ` +
  ` INNER JOIN ${USER_ACCOUNT_TABLE} AS user ` +
  ` ON ` +
  ` ${DIR_CONN_TABLE}.sender_id = user.id ` +
  ` WHERE ` +
  ` ${DIR_CONN_TABLE}.response = ? AND ${USER_ACCOUNT_TABLE}.id = ? `;

module.exports = {
  CREATE_CONNECTION,
  GET_REQUEST_IDS,
  GET_REQUESTS_WUSER,
  UPDATE_DIR_REQ,
  UPDATE_POST_REQ,
  CREATE_DIR_CONN,
  GET_SEND_P_CONN,
  GET_SEND_DIR_CONN,
  GET_REC_P_CONN,
  GET_REC_DIR_CONN
};
