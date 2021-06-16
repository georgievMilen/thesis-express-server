const ApiError = require("../../../error/ApiError");
const {
  GET_SEND_DIR_CONN,
  GET_REC_DIR_CONN,
  GET_REC_P_CONN,
  GET_SEND_P_CONN,
  GET_UID_BY_EMAIL
} = require("../../../constants");
const { model } = require("../../../models/model");
const { emailFromUrl } = require("../../../utils/emaiFromUrl");

async function getConnections(req, res, next) {
  const email = emailFromUrl(req.url);

  const uid = await model(GET_UID_BY_EMAIL, email);
  if (uid.length < 1) {
    console.error("No user found");
    return next(ApiError.badRequest("A problem with the DB occured."));
  }
  const recDirConn = await model(GET_REC_DIR_CONN, [1, uid[0].id]);

  const sendDirConn = await model(GET_SEND_DIR_CONN, [1, uid[0].id]);

  const sendPostConn = await model(GET_SEND_P_CONN, [1, uid[0].id]);

  const recPostConn = await model(GET_REC_P_CONN, [1, uid[0].id]);

  const dirConn = [...recDirConn, ...sendDirConn];
  const postConn = [...sendPostConn, ...recPostConn];

  res.status(200).send({ dirConn, postConn });
}

module.exports = {
  getConnections
};
