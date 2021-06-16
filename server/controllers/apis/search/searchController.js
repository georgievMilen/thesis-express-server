const { model } = require("../../../models/model");
const { emailFromUrl } = require("../../../utils/emaiFromUrl");
const {
  GET_USERS_DATA,
  GET_SEND_DIR_CONN,
  GET_REC_DIR_CONN,
  GET_UID_BY_EMAIL
} = require("../../../constants/index");

const searchForPeople = async (req, res, next) => {
  const email = emailFromUrl(req.url);

  const uid = await model(GET_UID_BY_EMAIL, email);
  if (uid.length === 0) {
    console.error("No user found");
    return next(ApiError.badRequest("A problem with the DB occured."));
  }
  const [{ id: user_id }] = uid;

  const users = await model(GET_USERS_DATA, email);
  const sendDirConn = await model(GET_SEND_DIR_CONN, [-1, user_id]);
  const sendDirConn1 = await model(GET_SEND_DIR_CONN, [1, user_id]);
  const recDirConn = await model(GET_REC_DIR_CONN, [-1, user_id]);
  const recDirConn1 = await model(GET_REC_DIR_CONN, [1, user_id]);

  const dirConnections = [
    ...sendDirConn,
    ...sendDirConn1,
    ...recDirConn,
    ...recDirConn1
  ];

  res.status(200).send({ users, dirConnections });
};

module.exports = { searchForPeople };
