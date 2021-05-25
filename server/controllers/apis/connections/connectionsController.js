const ApiError = require("../../../error/ApiError");
const {
  GET_REQUEST_IDS,
  GET_REQUESTS_WUSER,
  GET_POS_USER_BY_CON_ID,
  GET_CONN_BY_UID,
  CREATE_CONNECTION,
  UPDATE_CONNECTION,
  GET_UID_BY_EMAIL
} = require("../../../constants");
const { model } = require("../../../models/model");

async function sendConnectionRequest(req, res, next) {
  const { postId, email } = req.body;
  const uid = await model(GET_UID_BY_EMAIL, email);
  if (uid.length === 0)
    return next(ApiError.badRequest("A problem with the DB occured."));
  const [{ id: user_id }] = uid;

  model(CREATE_CONNECTION, [postId, user_id])
    .then(() => {
      res.status(200).send("Request was send!");
    })
    .catch((err) => next(err));
}

async function getConnections(req, res, next) {
  const url = req.url.split("=");
  const email = url[1];
  const promises = [];
  const populConn = [];
  const populReq = [];

  const uid = await model(GET_UID_BY_EMAIL, email);

  if (uid.length < 1)
    return next(ApiError.badRequest("A problem with the DB occured."));

  const connections = await model(GET_CONN_BY_UID, uid[0].id);
  const requestIds = await model(GET_REQUEST_IDS, email);

  if (connections.length > 0 && connections[0].connection_id !== null)
    connections.forEach((connection, index) => {
      const promise = model(
        GET_POS_USER_BY_CON_ID,
        connection.connection_id
      ).then((con_wuser) => {
        const binded = { ...con_wuser[0], ...connection };
        populConn.push(binded);
      });
      promises.push(promise);
    });

  if (requestIds.length > 0 && requestIds[0].connection_id !== null)
    requestIds.forEach((request) => {
      const promise = model(GET_REQUESTS_WUSER, request.connection_id).then(
        (req_wuser) => {
          const binded = { ...req_wuser[0], ...request };
          populReq.push(binded);
        }
      );

      promises.push(promise);
    });

  if (promises.length < 1) return res.status(200).send("No requests.");

  Promise.all(promises)
    .then(() => {
      res.status(200).send({ populReq, populConn });
    })
    .catch((err) => next(err));
}

const updateConnection = async (req, res, next) => {
  const update = await model(UPDATE_CONNECTION, [
    req.body.response,
    req.body.connection_id
  ]);
  if (update.affectedRows < 1)
    next(ApiError.badRequest("A problem with the DB occured."));
  res.status(200).send("Requst updated");
};

module.exports = { sendConnectionRequest, getConnections, updateConnection };
