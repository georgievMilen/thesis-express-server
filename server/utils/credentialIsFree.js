const { modal } = require("../models/users/usersModel");
function credentialIsTaken(query, credential) {
  let res = "";
  return modal(query, credential)
    .then((result) => {
      if (!result.length) return;
      res = credential + " already taken!";
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
}
module.exports = {
  credentialIsTaken
};
