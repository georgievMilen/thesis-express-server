const { constant } = require("lodash");
const {
  GET_CONNECTION_IDS,
  GET_CONNECTION_WUSER,
  UPDATE_CONNECTION
} = require("../../../constants");
const { model } = require("../../../models/model");

async function getConnections(req, res, next) {
  const url = req.url.split("=");
  const email = url[1];
  const connectionIds = await model(GET_CONNECTION_IDS, email);
  if (connectionIds.length === 0)
    next(ApiError.badRequest("A problem with the DB occured."));

  const populConnPromises = connectionIds.map(async (connection) => {
    return model(GET_CONNECTION_WUSER, connection.id);
  });
  Promise.all(populConnPromises)
    .then((result) => {
      if (result.length === 0)
        next(ApiError.badRequest("A problem with the DB occured."));
      res.status(200).send(result);
    })
    .catch((err) => next(err));
}

const updateConnection = async (req, res, next) => {
  const update = await model(UPDATE_CONNECTION, [
    req.body.response,
    req.body.id
  ]);
  if (update.affectedRows < 1)
    next(ApiError.badRequest("A problem with the DB occured."));
  res.status(200).send("Requst updated");
};

module.exports = { getConnections, updateConnection };
