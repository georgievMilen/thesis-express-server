const { userModal } = require("../../../models/users/usersModel");
const { GET_USERS_DATA } = require("../../../constants/index");
const searchForPeople = (req, res, next) => {
  userModal(GET_USERS_DATA)
    .then((results) => {
      console.log(results);
      res.status(200).send(results);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { searchForPeople };
