const ApiError = require("../../../error/ApiError");
const {
  GET_REC_P_CONN,
  GET_REC_DIR_CONN,
  CREATE_CONNECTION,
  UPDATE_DIR_REQ,
  UPDATE_POST_REQ,
  GET_UID_BY_EMAIL,
  CREATE_DIR_CONN
} = require("../../../constants");
const { model } = require("../../../models/model");
const { emailFromUrl } = require("../../../utils/emaiFromUrl");

async function sendConnectionRequest(req, res, next) {
  const { postId, email } = req.body;
  const uid = await model(GET_UID_BY_EMAIL, email);
  if (uid.length === 0) {
    console.error("No user found");
    return next(ApiError.badRequest("A problem with the DB occured."));
  }
  const [{ id: user_id }] = uid;

  model(CREATE_CONNECTION, [postId, user_id])
    .then(() => {
      res.status(200).send("Request was send!");
    })
    .catch((err) => next(err));
}

async function getRequests(req, res, next) {
  const email = emailFromUrl(req.url);

  const uid = await model(GET_UID_BY_EMAIL, email);

  if (uid.length < 1) {
    console.error("No user found");
    return next(ApiError.badRequest("A problem with the DB occured."));
  }

  const postReq = await model(GET_REC_P_CONN, [-1, uid[0].id]);
  const dirReq = await model(GET_REC_DIR_CONN, [-1, uid[0].id]);

  res.status(200).send({ postReq, dirReq });
}

const sendDirConnReq = async (req, res, next) => {
  const { senderEmail, receiverId } = req.body;

  const uid = await model(GET_UID_BY_EMAIL, senderEmail);
  if (uid.length === 0) {
    console.error("No user found");
    return next(ApiError.badRequest("A problem with the DB occured."));
  }
  const [{ id: sender_id }] = uid;

  model(CREATE_DIR_CONN, [sender_id, receiverId])
    .then(() => {
      res.status(200).send("Request was send!");
    })
    .catch((err) => next(err));
};

const updateDirRequest = async (req, res, next) => {
  const update = await model(UPDATE_DIR_REQ, [
    req.body.response,
    req.body.connectionId
  ]);
  if (update.affectedRows < 1)
    return next(ApiError.badRequest("A problem with the DB occured."));
  res.status(200).send("Requst updated");
};

const updatePostRequest = async (req, res, next) => {
  const update = await model(UPDATE_POST_REQ, [
    req.body.response,
    req.body.connectionId
  ]);
  if (update.affectedRows < 1)
    return next(ApiError.badRequest("A problem with the DB occured."));
  res.status(200).send("Requst updated");
};

module.exports = {
  getRequests,
  sendConnectionRequest,
  updatePostRequest,
  updateDirRequest,
  sendDirConnReq
};
