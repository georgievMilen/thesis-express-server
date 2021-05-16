const { model } = require("../../../models/model");
const { GET_USERS_DATA } = require("../../../constants/index");
const searchForPeople = (req, res, next) => {
  model(GET_USERS_DATA)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { searchForPeople };
