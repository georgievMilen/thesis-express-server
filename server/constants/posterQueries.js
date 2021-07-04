const {
  POSTERS_TABLE,
  CONNECTIONS_TABLE,
  USER_ACCOUNT_TABLE,
  POSTER_REGION_TABLE,
  POSTER_GENDER_TABLE,
  CHAT_TABLE
} = require("./tables");
const POST_POSTER =
  "INSERT INTO " +
  POSTERS_TABLE +
  " SET user_id = ?, text = ?, title = ?, type = ?, image = ?, age_to = ?, age_from = ?";
const GET_ALL_POSTSERS =
  "SELECT id, user_id, email, text, age_to,  age_from, title, type, image FROM " +
  POSTERS_TABLE;

const GET_ALL_POSTERS_WUSER =
  `SELECT ${POSTERS_TABLE}.id as postId, ` +
  ` ${POSTERS_TABLE}.user_id AS userId, ` +
  ` ${POSTERS_TABLE}.text, ` +
  ` ${POSTERS_TABLE}.age_to AS ageTo, ` +
  ` ${POSTERS_TABLE}.age_from AS ageFrom, ` +
  ` ${POSTERS_TABLE}.title, ` +
  ` ${POSTERS_TABLE}.type, ` +
  ` ${POSTERS_TABLE}.image, ` +
  ` ${USER_ACCOUNT_TABLE}.email, ` +
  ` ${USER_ACCOUNT_TABLE}.first_name AS firstName, ` +
  ` ${USER_ACCOUNT_TABLE}.last_name AS lastName ` +
  ` FROM ${POSTERS_TABLE} ` +
  ` LEFT JOIN ${USER_ACCOUNT_TABLE} ` +
  ` ON ${POSTERS_TABLE}.user_id = ${USER_ACCOUNT_TABLE}.id `;

const GET_MY_POSTERS =
  GET_ALL_POSTERS_WUSER + "WHERE " + USER_ACCOUNT_TABLE + ".email = ?";

const GET_UID_BY_POSTER = ` SELECT user_id FROM ${POSTERS_TABLE} WHERE id = ?`;

const DELETE_POSTER =
  `DELETE ${POSTERS_TABLE}, ${POSTER_REGION_TABLE}, ${POSTER_GENDER_TABLE}, ` +
  ` ${CONNECTIONS_TABLE}, ${CHAT_TABLE}` +
  ` FROM ${POSTERS_TABLE} LEFT JOIN ${POSTER_REGION_TABLE}` +
  ` ON ${POSTER_REGION_TABLE}.poster_id = ${POSTERS_TABLE}.id` +
  ` LEFT JOIN ${POSTER_GENDER_TABLE}` +
  ` ON ${POSTER_GENDER_TABLE}.poster_id = ${POSTERS_TABLE}.id` +
  ` LEFT JOIN ${CONNECTIONS_TABLE}` +
  ` ON ${CONNECTIONS_TABLE}.poster_id = ${POSTERS_TABLE}.id` +
  ` LEFT JOIN ${CHAT_TABLE}` +
  ` ON ${CHAT_TABLE}.connection_id = ${CONNECTIONS_TABLE}.id` +
  ` WHERE ${POSTERS_TABLE}.id = ?`;

module.exports = {
  POST_POSTER,
  GET_ALL_POSTSERS,
  GET_MY_POSTERS,
  GET_UID_BY_POSTER,
  GET_ALL_POSTERS_WUSER,
  DELETE_POSTER
};
